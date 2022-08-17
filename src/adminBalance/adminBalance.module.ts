import { Module } from '@nestjs/common';
import { AdminBalanceController } from './adminBalance.controller';
import { AdminBalanceService } from './adminBalance.service';

import { MongooseModule } from '@nestjs/mongoose';

import { AdminBalance, AdminBalanceSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminBalance.name, schema: AdminBalanceSchema }])],
  controllers: [AdminBalanceController],
  providers: [AdminBalanceService, BasicStrategy]
})
export class AdminBalanceModule { }
