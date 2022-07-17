import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Attachment, Request } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';
import { Product } from '../../product/schemas';
import { CreateAttachmentDto, SaveFileDto } from '../dto';

@Injectable()
export class AdvertiserRequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<any>,
  ) { }

  getRequests = async (paginationDto: PaginationDto, advertiser: { _id: any; }) => {
    try {
      const products = await this.requestModel.find({ advertiser: advertiser._id })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.requestModel.countDocuments({ advertiser: advertiser._id })
      return { data: products, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getRequestDetails = async (_id: IdDto, advertiser: { _id: any; }) => {
    try {
      return await this.requestModel.aggregate([
        //@ts-ignore
        { $match: { _id: new mongoose.Types.ObjectId(_id), advertiser: advertiser._id } },
        { $sort: { 'date_created': 1 } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'attachments',
            localField: '_id',
            foreignField: 'request',
            as: 'attachments'
          }
        }])
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  verifyRequest = async (_id: IdDto, advertiser: { _id: IdDto; }, file: CreateAttachmentDto) => {
    try {
      return await this.requestModel.findOneAndUpdate({ _id, adevertiser: advertiser._id },
        { $set: { screenshot: file } })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
