import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sha1 } from '../common/utils';
import { CreateUserDto, EditUserDto } from './dto';
import { User } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { ToggleDto } from 'src/common/dto/toggle.dto';
const crypto = require('crypto')

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<any>) { }

  getUsers = async (paginationDto: PaginationDto) => {
    try {
      const users = await this.userModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)

      const count = await this.userModel.countDocuments({})
      return { data: users, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getUserDetails = async (_id: IdDto) => {
    try {
      return await this.userModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  activateUser = async (toggleDto: ToggleDto) => {
    try {
      return await this.userModel.findOneAndUpdate({ _id: toggleDto._id }, {
        active: Boolean(toggleDto.state)
      }, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  verifyUser = async (toggleDto: ToggleDto) => {
    try {
      return await this.userModel.findOneAndUpdate({ _id: toggleDto._id }, {
        verified: Boolean(toggleDto.state)
      }, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  // 

  createUser = async (createUserDto: CreateUserDto) => {
    try {
      return await new this.userModel({
        ...createUserDto,
        password: sha1(createUserDto.password),
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editUser = async (editUserDto: EditUserDto) => {
    try {
      return await this.userModel.findOneAndUpdate({ _id: editUserDto._id }, {
        ...editUserDto,
        password: sha1(editUserDto.password)
      }, { new: true })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteUser = async (_id: IdDto) => {
    try {
      return await this.userModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
