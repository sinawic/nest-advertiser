import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Attachment, Request } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';
import { Product } from '../../product/schemas';
import { CreateAttachmentDto, SaveFileDto } from '../dto';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<any>,
    @InjectModel(Request.name) private requestModel: Model<any>,
    @InjectModel(Attachment.name) private attachmentModel: Model<any>
  ) { }

  getRequests = async (paginationDto: PaginationDto, user) => {
    try {
      const products = await this.requestModel.find({ user: user._id })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.requestModel.countDocuments({ user: user._id })
      return { data: products, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getRequestDetails = async (_id: IdDto, user) => {
    try {
      return await this.requestModel.aggregate([
        //@ts-ignore
        { $match: { _id: new mongoose.Types.ObjectId(_id), user: user._id } },
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

  createRequest = async (_id: IdDto, user: { _id: IdDto; }) => {
    try {
      const product = await this.productModel.findOne({ _id, active: true })
      if (!product)
        throw new HttpException({ message: 'product not found or not active' }, HttpStatus.BAD_REQUEST)
      return await new this.requestModel({
        price: product.price,
        product: product._id,
        user: user._id,
        advertiser: product.advertiser,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createAttachment = async (saveFileDto: SaveFileDto) => {
    try {
      return await new this.attachmentModel(saveFileDto).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
