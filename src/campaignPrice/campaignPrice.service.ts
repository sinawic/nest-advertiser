import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CampaignPrice } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { CreateCampaignPriceDto, EditCampaignPriceDto } from './dto';
import { ToggleDto } from '../common/dto/toggle.dto';

@Injectable()
export class CampaignPriceService {
  constructor(@InjectModel(CampaignPrice.name) private campaignPriceModel: Model<any>) { }

  getCampaignPrices = async (paginationDto: PaginationDto) => {
    try {
      const campaignPrices = await this.campaignPriceModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.campaignPriceModel.countDocuments({})
      return { data: campaignPrices, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getCampaignPriceDetails = async (_id: IdDto) => {
    try {
      return await this.campaignPriceModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createCampaignPrice = async (createCampaignPriceDto: CreateCampaignPriceDto) => {
    try {
      return await new this.campaignPriceModel({
        ...createCampaignPriceDto,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editCampaignPrice = async (editCampaignPriceDto: EditCampaignPriceDto) => {
    try {
      return await this.campaignPriceModel.findOneAndUpdate({ _id: editCampaignPriceDto._id }, editCampaignPriceDto)
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteCampaignPrice = async (_id: IdDto) => {
    // todo: check if there are any marketers with this campaignPrice
    // if (await this.campaignPriceModel.findOne({ parent: _id }))
    //   throw new HttpException({ message: 'Cant remove parent campaignPrice' }, HttpStatus.BAD_REQUEST)
    try {
      return await this.campaignPriceModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
