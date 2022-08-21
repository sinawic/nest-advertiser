import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from '../schemas';
import { IdDto, PaginationDto, StateChangeDto } from '../../common/dto';
import { CreateCampaignDto, EditCampaignDto } from '../dto';
import { CampaignPrice } from '../../campaignPrice/schemas';
import { CampaignPercent } from '../../campaignPercent/schemas';
import { timeDif } from 'src/common/utils';

@Injectable()
export class CampaignAdvertiserService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<any>,
    @InjectModel(CampaignPrice.name) private campaignPriceModel: Model<any>,
    @InjectModel(CampaignPercent.name) private campaignPercentModel: Model<any>,
  ) { }

  getCampaigns = async (paginationDto: PaginationDto, advertiser) => {
    try {
      const campaigns = await this.campaignModel.find({ advertiser: advertiser._id })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.campaignModel.countDocuments({ advertiser: advertiser._id })
      return { data: campaigns, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getCampaignDetails = async (_id: IdDto, advertiser) => {
    try {
      return await this.campaignModel.findOne({ _id, advertiser: advertiser._id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createCampaign = async (createCampaignDto: CreateCampaignDto, advertiser) => {
    try {
      if (createCampaignDto.type === 'discount_code' &&
        (!createCampaignDto.discount_percent || !createCampaignDto.discount_usable_count)) {
        throw new HttpException({ message: 'discount_percent and discount_usable_count are required in this type' }, HttpStatus.BAD_REQUEST)
      }

      const prices = await this.campaignPriceModel.findOne({
        campaign_type: createCampaignDto.type,
        level: createCampaignDto.level
      })
      if (!prices)
        throw new HttpException({ message: 'prices are not defined for this level and campaign type' }, HttpStatus.BAD_REQUEST)

      const percents = await this.campaignPercentModel.findOne({
        campaign_type: createCampaignDto.type,
        level: createCampaignDto.level
      })
      if (!percents)
        throw new HttpException({ message: 'percentages are not defined for this level and campaign type' }, HttpStatus.BAD_REQUEST)

      let dif = timeDif(createCampaignDto.start_date, createCampaignDto.end_date)
      if (dif < 1)
        throw new HttpException({ message: 'campaign duration must be at least 1 day' }, HttpStatus.BAD_REQUEST)

      return await new this.campaignModel({
        ...createCampaignDto,
        advertiser: advertiser._id,
        final_price: (dif * prices.day_price) + (createCampaignDto.marketer_count * prices.marketer_price) + (createCampaignDto.product_count * prices.product_price),
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editCampaign = async (editCampaignDto: EditCampaignDto, advertiser) => {
    try {
      // todo: check if campaign has any marketer joined

      const prices = await this.campaignPriceModel.findOne({
        campaign_type: editCampaignDto.type,
        level: editCampaignDto.level
      })

      let dif = timeDif(editCampaignDto.start_date, editCampaignDto.end_date)
      if (dif < 1)
        throw new HttpException({ message: 'campaign duration must be at least 1 day' }, HttpStatus.BAD_REQUEST)

      return await this.campaignModel.findOneAndUpdate({ _id: editCampaignDto._id, advertiser: advertiser._id },
        {
          ...editCampaignDto,
          final_price: (dif * prices.day_price) + (editCampaignDto.marketer_count * prices.marketer_price) + (editCampaignDto.product_count * prices.product_price)
        })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  toggleCampaign = async (stateChangeDto: StateChangeDto, advertiser) => {
    try {
      const campaign = await this.campaignModel.findOne({ _id: stateChangeDto._id, advertiser: advertiser._id })
      if (campaign.state === 'done')
        throw new HttpException({ message: 'campaign is already done' }, HttpStatus.BAD_REQUEST)
      campaign.state = stateChangeDto.state
      return await campaign.save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  objectCampaign = async (stateChangeDto: StateChangeDto, advertiser) => {
    try {
      const campaign = await this.campaignModel.findOne({ _id: stateChangeDto._id, advertiser: advertiser._id })
      if (!campaign)
        throw new HttpException({ message: 'campaign not found' }, HttpStatus.BAD_REQUEST)
      if (campaign.state !== 'done' || campaign.objection)
        throw new HttpException({ message: 'campaign is already taking place or you have already made an objection' }, HttpStatus.BAD_REQUEST)
      campaign.objection = stateChangeDto.state
      return await campaign.save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteCampaign = async (_id: IdDto, advertiser) => {
    // todo: check if campaign has any marketer joined
    try {
      return await this.campaignModel.findOneAndDelete({ _id, advertiser: advertiser._id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
