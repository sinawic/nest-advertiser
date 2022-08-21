import { Module } from '@nestjs/common';
import { MarketerCampaignPriceAdminController, MarketerDiscountPriceAdminController } from './controllers';
import { MarketerCampaignPriceService, MarketerDiscountPriceService } from './services';

import { MongooseModule } from '@nestjs/mongoose';

import {
  MarketerCampaignPrice, MarketerCampaignPriceSchema,
  MarketerDiscountPrice, MarketerDiscountPriceSchema
} from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarketerCampaignPrice.name, schema: MarketerCampaignPriceSchema },
      { name: MarketerDiscountPrice.name, schema: MarketerDiscountPriceSchema }])],
  controllers: [MarketerCampaignPriceAdminController, MarketerDiscountPriceAdminController],
  providers: [MarketerCampaignPriceService, MarketerDiscountPriceService, BasicStrategy]
})
export class MarketerCampaignPriceModule { }
