import { Module } from '@nestjs/common';
import { CampaignAdvertiserController, CampaignAdminController } from './controllers';
import { CampaignAdvertiserService, CampaignAdminService } from './service';

import { MongooseModule } from '@nestjs/mongoose';

import { Campaign, CampaignSchema } from './schemas';
import { AdvertiserJwtStrategy } from '../auth/Strategy';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { JwtModule } from '@nestjs/jwt';
import { AdvertiserAuthService } from '../auth/service';
import { Level, LevelSchema } from '../level/schemas';
import { CampaignPrice, CampaignPriceSchema } from '../campaignPrice/schemas';
import { CampaignPercent, CampaignPercentSchema } from '../campaignPercent/schemas';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: CampaignPrice.name, schema: CampaignPriceSchema },
      { name: CampaignPercent.name, schema: CampaignPercentSchema },
      { name: Level.name, schema: LevelSchema },
      { name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [CampaignAdvertiserController, CampaignAdminController],
  providers: [CampaignAdvertiserService, CampaignAdminService, AdvertiserJwtStrategy, AdvertiserAuthService]
})
export class CampaignModule { }
