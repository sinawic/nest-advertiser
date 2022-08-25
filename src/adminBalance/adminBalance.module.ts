import { Module } from '@nestjs/common';
import { AdminBalanceController } from './adminBalance.controller';
import { AdminBalanceService } from './adminBalance.service';

import { InjectModel, MongooseModule } from '@nestjs/mongoose';

import { AdminBalance, AdminBalanceSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminBalance.name, schema: AdminBalanceSchema }])],
  controllers: [AdminBalanceController],
  providers: [AdminBalanceService, BasicStrategy]
})
export class AdminBalanceModule {
  constructor(
    @InjectModel(AdminBalance.name) private adminBalanceModel: Model<any>,
  ) {
    this.createAdminInitialBalance()
  }
  createAdminInitialBalance = async () => {
    if (!await this.adminBalanceModel.findOne({}))
      return await new this.adminBalanceModel({ balance: 0 }).save()
  }
}
