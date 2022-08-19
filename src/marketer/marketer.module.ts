import { Module } from '@nestjs/common';
import { MarketerAdminController } from './controllers';
import { MarketerService } from './marketer.service';
import { Marketer, MarketerSchema } from './schemas';
import { Level, LevelSchema } from '../level/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicStrategy } from '../auth/Strategy';


@Module({
  controllers: [MarketerAdminController],
  providers: [MarketerService, BasicStrategy],
  imports: [MongooseModule.forFeature([
    { name: Marketer.name, schema: MarketerSchema },
    { name: Level.name, schema: LevelSchema }])]
})
export class MarketersModule { }
