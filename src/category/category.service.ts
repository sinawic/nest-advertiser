import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { CreateCategoryDto, EditCategoryDto } from './dto/';
import { ToggleDto } from '../common/dto/toggle.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<any>) { }

  getCategories = async (paginationDto: PaginationDto, active: boolean = false) => {
    try {
      const categories = await this.categoryModel.find(active ? { active } : {})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.categoryModel.countDocuments(active ? { active } : {})
      return { data: categories, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getCategoryDetails = async (_id: IdDto, active: boolean = false) => {
    try {
      return await this.categoryModel.findOne(active ? { _id, active } : { _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createCategory = async (createCategoryDto: CreateCategoryDto) => {
    try {
      if (createCategoryDto.parent && !await this.categoryModel.findById(createCategoryDto.parent))
        throw new HttpException({ message: 'Parent category not found' }, HttpStatus.BAD_REQUEST)
      return await new this.categoryModel({
        ...createCategoryDto,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editCategory = async (editCategoryDto: EditCategoryDto) => {
    try {
      return await this.categoryModel.findOneAndUpdate({ _id: editCategoryDto._id }, editCategoryDto)
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  toggleCategory = async (toggleDto: ToggleDto) => {
    try {
      return await this.categoryModel.findOneAndUpdate({ _id: toggleDto._id },
        { active: Boolean(toggleDto.state) })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteCategory = async (_id: IdDto) => {
    if (await this.categoryModel.findOne({ parent: _id }))
      throw new HttpException({ message: 'Cant remove parent category' }, HttpStatus.BAD_REQUEST)
    try {
      return await this.categoryModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
