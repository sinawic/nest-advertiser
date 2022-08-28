import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from '../schemas';
import { IdDto, PaginationDto, StateChangeDto } from '../../common/dto';
import { CreateCampaignDto, EditCampaignDto } from '../dto';
import { CampaignPrice } from '../../campaignPrice/schemas';
import { CampaignPercent } from '../../campaignPercent/schemas';
import { ObjectionDate } from '../../objectionDate/schemas';
import { Join } from '../../join/schemas';
import { addDays, timeDif } from 'src/common/utils';
import { unlink } from 'fs';

@Injectable()
export class CampaignAdvertiserService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<any>,
    @InjectModel(CampaignPrice.name) private campaignPriceModel: Model<any>,
    @InjectModel(CampaignPercent.name) private campaignPercentModel: Model<any>,
    @InjectModel(Join.name) private joinModel: Model<any>,
    @InjectModel(ObjectionDate.name) private objectionDateModel: Model<any>
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

  createCampaign = async (createCampaignDto: CreateCampaignDto, advertiser, files) => {
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

      const campaign = new this.campaignModel({
        ...createCampaignDto,
        advertiser: advertiser._id,
        final_price: (dif * prices.day_price) + (createCampaignDto.marketer_count * prices.marketer_price) + (createCampaignDto.product_count * prices.product_price),
        date_created: new Date()
      })

      if (files.pic && files.pic[0])
        campaign.pic = files.pic[0]

      if (files.product_pic && files.product_pic[0])
        campaign.product_pic = files.product_pic[0]

      return await campaign.save()

    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editCampaign = async (editCampaignDto: EditCampaignDto, advertiser, files) => {
    try {
      if (await this.joinModel.findOne({ campaign: editCampaignDto._id }))
        throw new HttpException({ message: 'campaign has marketers joined' }, HttpStatus.BAD_REQUEST)
      const prices = await this.campaignPriceModel.findOne({
        campaign_type: editCampaignDto.type,
        level: editCampaignDto.level
      })

      let dif = timeDif(editCampaignDto.start_date, editCampaignDto.end_date)
      if (dif < 1)
        throw new HttpException({ message: 'campaign duration must be at least 1 day' }, HttpStatus.BAD_REQUEST)

      const campaign = await this.campaignModel.findOneAndUpdate({ _id: editCampaignDto._id, advertiser: advertiser._id },
        {
          ...editCampaignDto,
          final_price: (dif * prices.day_price) + (editCampaignDto.marketer_count * prices.marketer_price) + (editCampaignDto.product_count * prices.product_price)
        }, { new: true })

      if (files.pic && files.pic[0]) {
        campaign.pic && unlink(campaign.pic.path, () => { })
        campaign.pic = files.pic[0]
      }

      if (files.product_pic && files.product_pic[0]) {
        campaign.product_pic && unlink(campaign.product_pic.path, () => { })
        campaign.product_pic = files.product_pic[0]
      }

      return await campaign.save()
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
      const maxDays = await this.objectionDateModel.findOne({})
      if (!maxDays)
        throw new HttpException({ message: 'cannot validate objection action due to undefined max days' }, HttpStatus.BAD_REQUEST)
      const campaign = await this.campaignModel.findOne({ _id: stateChangeDto._id, advertiser: advertiser._id })
      if (!campaign)
        throw new HttpException({ message: 'campaign not found' }, HttpStatus.BAD_REQUEST)

      if (campaign.state !== 'done' || campaign.objection || addDays(new Date(campaign.end_date), maxDays.max_days) < new Date())
        throw new HttpException({ message: 'campaign is either expired or already taking place or you have already made an objection' }, HttpStatus.BAD_REQUEST)
      campaign.objection = stateChangeDto.state
      return await campaign.save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteCampaign = async (_id: IdDto, advertiser) => {
    try {
      if (await this.joinModel.findOne({ campaign: _id }))
        throw new HttpException({ message: 'campaign has marketers joined' }, HttpStatus.BAD_REQUEST)
      return await this.campaignModel.findOneAndDelete({ _id, advertiser: advertiser._id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }


  deleteCampaignPic = async (_id: IdDto, advertiser) => {
    try {
      if (await this.joinModel.findOne({ campaign: _id }))
        throw new HttpException({ message: 'campaign has marketers joined' }, HttpStatus.BAD_REQUEST)
      const campaign = await this.campaignModel.findOne({ _id, advertiser: advertiser._id })
      if (campaign.pic) {
        unlink(campaign.pic.path, () => { })
        campaign.pic = null
        return await campaign.save()
      }
      throw new HttpException({ message: 'campaing does not have any pics' }, HttpStatus.BAD_REQUEST)
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  addClicks = async ({ amount, _id }, advertiser) => {
    try {
      const campaign = await this.campaignModel.findOne({ _id, advertiser: advertiser._id })
      if (!campaign)
        throw new HttpException({ message: 'campaign not found' }, HttpStatus.BAD_REQUEST)

      if (campaign.state === 'done')
        throw new HttpException({ message: 'campaign is already done' }, HttpStatus.BAD_REQUEST)
      campaign.click_count = (campaign.click_count || 0) + amount
      return await campaign.save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
