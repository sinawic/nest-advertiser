import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Attachment, Request } from '../schemas';
import { IdDto, PaginationDto, ToggleDto } from '../../common/dto';
import { Product } from '../../product/schemas';
import { CreateAttachmentDto, SaveFileDto } from '../dto';

@Injectable()
export class AdminRequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<any>,
  ) { }

  getRequests = async (paginationDto: PaginationDto) => {
    try {
      const products = await this.requestModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.requestModel.countDocuments({})
      return { data: products, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getRequestDetails = async (_id: IdDto) => {
    try {
      return await this.requestModel.aggregate([
        //@ts-ignore
        { $match: { _id: new mongoose.Types.ObjectId(_id) } },
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

  toggleRequest = async (toggleDto: ToggleDto) => {
    try {
      return await this.requestModel.findOneAndUpdate({ _id: toggleDto._id },
        { admin_verified: Boolean(toggleDto.active) })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
