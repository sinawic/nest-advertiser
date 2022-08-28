import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';

@Injectable()
export class CampaignMarketerService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<any>,
  ) { }

  getCampaigns = async (paginationDto: PaginationDto, marketer) => {
    try {
      const campaigns = await this.campaignModel.find({
        state: 'process', level: marketer.level, end_date: { $gt: new Date() }, admin_verified: true,
        '$where': 'this.marketers_joined < this.marketer_count'
      })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
        .select('-objection -objection_response -objection_status')
      const count = await this.campaignModel.count({
        state: 'process', level: marketer.level, end_date: { $gt: new Date() }, admin_verified: true,
        '$where': 'this.marketers_joined < this.marketer_count'
      })
      return { data: campaigns, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getCampaignDetails = async (_id: IdDto, marketer) => {
    try {
      return await this.campaignModel.findOne({
        _id, state: 'process', level: marketer.level, end_date: { $gt: new Date() }, admin_verified: true,
        '$where': 'this.marketers_joined < this.marketer_count'
      })
        .select('-objection -objection_response -objection_status')
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}