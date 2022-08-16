import { Module } from '@nestjs/common';
import { CampaignPercentAdminController } from './controllers';
import { CampaignPercentService } from './campaignPercent.service';

import { MongooseModule } from '@nestjs/mongoose';

import { CampaignPercent, CampaignPercentSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignPercent.name, schema: CampaignPercentSchema }])],
  controllers: [CampaignPercentAdminController],
  providers: [CampaignPercentService, BasicStrategy]
})
export class CampaignPercentModule { }
