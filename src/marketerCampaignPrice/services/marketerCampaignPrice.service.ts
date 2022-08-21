import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MarketerCampaignPrice } from '../schemas';
import { IdDto } from '../../common/dto';
import { CreateMarketerCampaignPriceDto } from '../dto';

@Injectable()
export class MarketerCampaignPriceService {
  constructor(@InjectModel(MarketerCampaignPrice.name) private campaignPriceModel: Model<any>) { }

  getMarketerCampaignPrice = async () => {
    try {
      return await this.campaignPriceModel.findOne({})
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createMarketerCampaignPrice = async (createMarketerCampaignPriceDto: CreateMarketerCampaignPriceDto) => {
    try {
      await this.campaignPriceModel.deleteMany({})
      return await new this.campaignPriceModel(createMarketerCampaignPriceDto).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
