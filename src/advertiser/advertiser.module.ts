import { Module } from '@nestjs/common';
import { AdvertiserAdminController } from './controllers/';
import { AdvertiserService } from './advertiser.service';
import { Advertiser, AdvertiserSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicStrategy } from '../auth/Strategy';


@Module({
  controllers: [AdvertiserAdminController],
  providers: [AdvertiserService, BasicStrategy],
  imports: [MongooseModule.forFeature([{ name: Advertiser.name, schema: AdvertiserSchema }])]
})
export class AdvertisersModule { }
