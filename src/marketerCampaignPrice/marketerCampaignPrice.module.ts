import { Module } from '@nestjs/common';
import { MarketerCampaignPriceAdminController } from './controllers';
import { MarketerCampaignPriceService } from './marketerCampaignPrice.service';

import { MongooseModule } from '@nestjs/mongoose';

import { MarketerCampaignPrice, MarketerCampaignPriceSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarketerCampaignPrice.name, schema: MarketerCampaignPriceSchema }])],
  controllers: [MarketerCampaignPriceAdminController],
  providers: [MarketerCampaignPriceService, BasicStrategy]
})
export class MarketerCampaignPriceModule { }
