import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas';
import { IdDto, PaginationDto, ToggleDto } from '../../common/dto';
import { CreateProductDto, EditProductDto } from '../dto';
import { Category } from '../../category/schemas';

@Injectable()
export class AdvertiserProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<any>,
    @InjectModel(Category.name) private categoryModel: Model<any>
  ) { }

  getProducts = async (paginationDto: PaginationDto, advertiser) => {
    try {
      const products = await this.productModel.find({ advertiser: advertiser._id })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.productModel.countDocuments({ advertiser: advertiser._id })
      return { data: products, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getProductDetails = async (_id: IdDto, advertiser) => {
    try {
      return await this.productModel.findOne({ _id, advertiser: advertiser._id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createProduct = async (createProductDto: CreateProductDto, advertiser) => {
    try {
      if (createProductDto.category && !await this.categoryModel.findOne({
        _id: createProductDto.category, active: true
      }))
        throw new HttpException({ message: 'Category not found or not active' }, HttpStatus.BAD_REQUEST)
      return await new this.productModel({
        ...createProductDto,
        advertiser: advertiser._id,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editProduct = async (editProductDto: EditProductDto) => {
    try {
      return await this.productModel.findOneAndUpdate({ _id: editProductDto._id }, editProductDto)
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  toggleProduct = async (toggleDto: ToggleDto) => {
    try {
      return await this.productModel.findOneAndUpdate({ _id: toggleDto._id },
        { active: Boolean(toggleDto.active) })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteProduct = async (_id: IdDto) => {
    if (await this.productModel.findOne({ parent: _id }))
      throw new HttpException({ message: 'Cant remove parent product' }, HttpStatus.BAD_REQUEST)
    try {
      return await this.productModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
