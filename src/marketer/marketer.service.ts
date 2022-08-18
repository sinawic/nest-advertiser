import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sha1 } from '../common/utils';
import { CreateMarketerDto, EditMarketerDto } from './dto';
import { Marketer } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { ToggleDto } from 'src/common/dto/toggle.dto';
const crypto = require('crypto')

@Injectable()
export class MarketerService {
  constructor(@InjectModel(Marketer.name) private marketerModel: Model<any>) { }

  getMarketers = async (paginationDto: PaginationDto) => {
    try {
      const marketers = await this.marketerModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)

      const count = await this.marketerModel.countDocuments({})
      return { data: marketers, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getMarketerDetails = async (_id: IdDto) => {
    try {
      return await this.marketerModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  activateMarketer = async (toggleDto: ToggleDto) => {
    try {
      return await this.marketerModel.findOneAndUpdate({ _id: toggleDto._id }, {
        active: Boolean(toggleDto.active)
      })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  verifyMarketer = async (toggleDto: ToggleDto) => {
    try {
      return await this.marketerModel.findOneAndUpdate({ _id: toggleDto._id }, {
        verified: Boolean(toggleDto.active)
      })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  // 

  createMarketer = async (createMarketerDto: CreateMarketerDto) => {
    try {
      return await new this.marketerModel({
        ...createMarketerDto,
        password: sha1(createMarketerDto.password),
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editMarketer = async (editMarketerDto: EditMarketerDto) => {
    try {
      return await this.marketerModel.findOneAndUpdate({ _id: editMarketerDto._id }, {
        ...editMarketerDto,
        password: sha1(editMarketerDto.password)
      })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteMarketer = async (_id: IdDto) => {
    try {
      return await this.marketerModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
