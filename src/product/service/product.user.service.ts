import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';
import { Category } from '../../category/schemas';

@Injectable()
export class UserProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<any>
  ) { }

  getProducts = async (paginationDto: PaginationDto, category) => {
    try {
      const products = await this.productModel.find({ active: true, category })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.productModel.countDocuments({ active: true, category })
      return { data: products, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getProductDetails = async (_id: IdDto) => {
    try {
      return await this.productModel.findOne({ _id, active: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
