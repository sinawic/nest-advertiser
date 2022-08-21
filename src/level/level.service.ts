import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Level } from './schemas';
import { Marketer } from '../marketer/schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { CreateLevelDto, EditLevelDto } from './dto';

@Injectable()
export class LevelService {
  constructor(@InjectModel(Level.name) private levelModel: Model<any>,
    @InjectModel(Marketer.name) private marketerModel: Model<any>) { }

  getLevels = async (paginationDto: PaginationDto) => {
    try {
      const categories = await this.levelModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.levelModel.countDocuments({})
      return { data: categories, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getLevelDetails = async (_id: IdDto) => {
    try {
      return await this.levelModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createLevel = async (createLevelDto: CreateLevelDto) => {
    try {
      return await new this.levelModel({
        ...createLevelDto,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editLevel = async (editLevelDto: EditLevelDto) => {
    try {
      return await this.levelModel.findOneAndUpdate({ _id: editLevelDto._id }, editLevelDto, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteLevel = async (_id: IdDto) => {
    if (await this.marketerModel.findOne({}))
      throw new HttpException({ message: 'marketer already exist with this level' }, HttpStatus.BAD_REQUEST)

    try {
      return await this.levelModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
