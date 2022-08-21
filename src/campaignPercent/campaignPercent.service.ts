import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CampaignPercent } from './schemas';
import { Campaign } from './../campaign/schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { CreateCampaignPercentDto, EditCampaignPercentDto } from './dto';

@Injectable()
export class CampaignPercentService {
  constructor(@InjectModel(CampaignPercent.name) private campaignPercentModel: Model<any>,
    @InjectModel(Campaign.name) private campaignModel: Model<any>) { }

  getCampaignPercents = async (paginationDto: PaginationDto) => {
    try {
      const campaignPercents = await this.campaignPercentModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.campaignPercentModel.countDocuments({})
      return { data: campaignPercents, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getCampaignPercentDetails = async (_id: IdDto) => {
    try {
      return await this.campaignPercentModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createCampaignPercent = async (createCampaignPercentDto: CreateCampaignPercentDto) => {
    try {
      if (createCampaignPercentDto.campaign_type === 'introducer_code'
        && !createCampaignPercentDto.advertizer_percent)
        throw new HttpException({ message: 'Advertizer percent is required in this type' }, HttpStatus.BAD_REQUEST)
      return await new this.campaignPercentModel({
        ...createCampaignPercentDto,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editCampaignPercent = async (editCampaignPercentDto: EditCampaignPercentDto) => {
    try {
      return await this.campaignPercentModel.findOneAndUpdate({ _id: editCampaignPercentDto._id }, editCampaignPercentDto, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteCampaignPercent = async (_id: IdDto) => {
    if (await this.campaignModel.findOne({}))
      throw new HttpException({ message: 'Cannot delete campaign percent because it has campaigns' }, HttpStatus.BAD_REQUEST)

    try {
      return await this.campaignPercentModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
