import { Module } from '@nestjs/common';
import { ObjectionDateController } from './objectionDate.controller';
import { ObjectionDateService } from './objectionDate.service';

import { MongooseModule } from '@nestjs/mongoose';

import { ObjectionDate, ObjectionDateSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ObjectionDate.name, schema: ObjectionDateSchema }])],
  controllers: [ObjectionDateController],
  providers: [ObjectionDateService, BasicStrategy]
})
export class ObjectionDateModule { }
