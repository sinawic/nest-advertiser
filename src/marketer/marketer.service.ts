import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sha1 } from '../common/utils';
import { AssignMarketerLevelDto, CreateMarketerDto, EditMarketerDto } from './dto';
import { Marketer } from './schemas';
import { Level } from './../level/schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { ToggleDto } from 'src/common/dto/toggle.dto';
const crypto = require('crypto')

@Injectable()
export class MarketerService {
  constructor(
    @InjectModel(Marketer.name) private marketerModel: Model<any>,
    @InjectModel(Level.name) private levelModel: Model<any>) { }

  getMarketers = async (paginationDto: PaginationDto) => {
    try {
      const marketers = await this.marketerModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)

      const count = await this.marketerModel.countDocuments({})
      return { data: marketers, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getMarketerDetails = async (_id: IdDto) => {
    try {
      return await this.marketerModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  activateMarketer = async (toggleDto: ToggleDto) => {
    try {
      return await this.marketerModel.findOneAndUpdate({ _id: toggleDto._id }, {
        active: Boolean(toggleDto.state)
      }, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  verifyMarketer = async (toggleDto: ToggleDto) => {
    try {
      return await this.marketerModel.findOneAndUpdate({ _id: toggleDto._id }, {
        verified: Boolean(toggleDto.state)
      }, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  assignLevel = async (assignMarketerLevelDto: AssignMarketerLevelDto) => {
    if (!await this.levelModel.findOne({ _id: assignMarketerLevelDto.level }))
      throw new HttpException({ message: 'Level not found' }, HttpStatus.BAD_REQUEST)
    try {
      return await this.marketerModel.findOneAndUpdate({ _id: assignMarketerLevelDto._id }, { level: assignMarketerLevelDto.level }, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
