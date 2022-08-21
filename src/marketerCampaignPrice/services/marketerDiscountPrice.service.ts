import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MarketerDiscountPrice } from '../schemas';
import { IdDto } from '../../common/dto';
import { CreateMarketerDiscountPriceDto } from '../dto';

@Injectable()
export class MarketerDiscountPriceService {
  constructor(@InjectModel(MarketerDiscountPrice.name) private campaignPriceModel: Model<any>) { }

  getMarketerDiscountPrice = async () => {
    try {
      return await this.campaignPriceModel.find({})
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createMarketerDiscountPrice = async (createMarketerDiscountPriceDto: CreateMarketerDiscountPriceDto) => {
    try {
      const old = await this.campaignPriceModel.findOneAndUpdate({ percent: createMarketerDiscountPriceDto.percent }, createMarketerDiscountPriceDto, { new: true })
      if (old) return old
      return await new this.campaignPriceModel(createMarketerDiscountPriceDto).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
