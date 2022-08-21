import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectionDate } from './schemas';
import { CreateObjectionDateDto } from './dto';

@Injectable()
export class ObjectionDateService {
  constructor(@InjectModel(ObjectionDate.name) private objectionDateModel: Model<any>) { }

  getObjectionDate = async () => {
    try {
      return await this.objectionDateModel.findOne({})
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createObjectionDate = async (createObjectionDateDto: CreateObjectionDateDto) => {
    try {
      await this.objectionDateModel.deleteMany({})
      return await new this.objectionDateModel(createObjectionDateDto).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
