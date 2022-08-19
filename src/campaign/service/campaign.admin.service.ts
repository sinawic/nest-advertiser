import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from '../schemas';
import { IdDto, PaginationDto, StateChangeDto } from '../../common/dto';

@Injectable()
export class CampaignAdminService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<any>,
  ) { }

  getCampaigns = async (paginationDto: PaginationDto) => {
    try {
      const campaigns = await this.campaignModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.campaignModel.countDocuments({})
      return { data: campaigns, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getCampaignDetails = async (_id: IdDto) => {
    try {
      return await this.campaignModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  objectCampaign = async (stateChangeDto: StateChangeDto, approved) => {
    try {
      const campaign = await this.campaignModel.findOne({ _id: stateChangeDto._id })
      if (!campaign)
        throw new HttpException({ message: 'campaign not found' }, HttpStatus.BAD_REQUEST)
      if (!campaign.objection)
        throw new HttpException({ message: 'this campaign has no objection' }, HttpStatus.BAD_REQUEST)
      campaign.objection_response = stateChangeDto.state
      campaign.objection_status = Boolean(approved)
      return await campaign.save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
