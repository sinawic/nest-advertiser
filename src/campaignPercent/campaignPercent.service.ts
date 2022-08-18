import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CampaignPercent } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { CreateCampaignPercentDto, EditCampaignPercentDto } from './dto';
import { ToggleDto } from '../common/dto/toggle.dto';

@Injectable()
export class CampaignPercentService {
  constructor(@InjectModel(CampaignPercent.name) private campaignPercentModel: Model<any>) { }

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
      return await this.campaignPercentModel.findOneAndUpdate({ _id: editCampaignPercentDto._id }, editCampaignPercentDto)
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteCampaignPercent = async (_id: IdDto) => {
    // todo: check if there are any marketers with this campaignPercent
    // if (await this.campaignPercentModel.findOne({ parent: _id }))
    //   throw new HttpException({ message: 'Cant remove parent campaignPercent' }, HttpStatus.BAD_REQUEST)
    try {
      return await this.campaignPercentModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
