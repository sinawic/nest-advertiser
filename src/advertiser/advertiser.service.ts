import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sha1 } from '../common/utils';
import { ActivateAdvertiserDto, CreateAdvertiserDto, EditAdvertiserDto } from './dto';
import { Advertiser } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
const crypto = require('crypto')

@Injectable()
export class AdvertiserService {
  constructor(@InjectModel(Advertiser.name) private advertiserModel: Model<any>) { }

  getAdvertisers = async (paginationDto: PaginationDto) => {
    try {
      const advertisers = await this.advertiserModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)

      const count = await this.advertiserModel.countDocuments({})
      return { data: advertisers, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getAdvertiserDetails = async (_id: IdDto) => {
    try {
      return await this.advertiserModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  activateAdvertiser = async (activateAdvertiserDto: ActivateAdvertiserDto) => {
    try {
      return await this.advertiserModel.findOneAndUpdate({ _id: activateAdvertiserDto._id }, {
        active: activateAdvertiserDto.active
      })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  // 

  createAdvertiser = async (createAdvertiserDto: CreateAdvertiserDto) => {
    try {
      return await new this.advertiserModel({
        ...createAdvertiserDto,
        password: sha1(createAdvertiserDto.password),
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editAdvertiser = async (editAdvertiserDto: EditAdvertiserDto) => {
    try {
      return await this.advertiserModel.findOneAndUpdate({ _id: editAdvertiserDto._id }, {
        ...editAdvertiserDto,
        password: sha1(editAdvertiserDto.password)
      })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteAdvertiser = async (_id: IdDto) => {
    try {
      return await this.advertiserModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
