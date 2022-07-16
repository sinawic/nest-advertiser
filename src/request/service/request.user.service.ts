import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectModel(Request.name) private productModel: Model<any>
  ) { }

  getRequests = async (paginationDto: PaginationDto, category) => {
    try {
      const products = await this.productModel.find({ active: true, category })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.productModel.countDocuments({ active: true, category })
      return { data: products, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getRequestDetails = async (_id: IdDto) => {
    try {
      return await this.productModel.findOne({ _id, active: true })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
