import { Module } from '@nestjs/common';
import { CampaignPriceAdminController } from './controllers';
import { CampaignPriceService } from './campaignPrice.service';

import { MongooseModule } from '@nestjs/mongoose';

import { CampaignPrice, CampaignPriceSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignPrice.name, schema: CampaignPriceSchema }])],
  controllers: [CampaignPriceAdminController],
  providers: [CampaignPriceService, BasicStrategy]
})
export class CampaignPriceModule { }
