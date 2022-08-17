import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdminBalance } from './schemas';

@Injectable()
export class AdminBalanceService {
  constructor(@InjectModel(AdminBalance.name) private adminBalanceModel: Model<any>) { }

  getAdminBalance = async () => {
    try {
      const balance = await this.adminBalanceModel.findOne({})
      return balance || { balance: 0 }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
