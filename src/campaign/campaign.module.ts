import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CampaignAdvertiserController, CampaignAdminController, CampaignMarketerController } from './controllers';
import { CampaignAdvertiserService, CampaignAdminService, CampaignMarketerService } from './service';

import { MongooseModule } from '@nestjs/mongoose';

import { Campaign, CampaignSchema } from './schemas';
import { AdvertiserJwtStrategy, MarketerJwtStrategy } from '../auth/Strategy';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { Marketer, MarketerSchema } from '../marketer/schemas';
import { JwtModule } from '@nestjs/jwt';
import { AdvertiserAuthService, MarketerAuthService } from '../auth/service';
import { Level, LevelSchema } from '../level/schemas';
import { CampaignPrice, CampaignPriceSchema } from '../campaignPrice/schemas';
import { CampaignPercent, CampaignPercentSchema } from '../campaignPercent/schemas';
import { ObjectionDate, ObjectionDateSchema } from '../objectionDate/schemas';
import { Join, JoinSchema } from '../join/schemas';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: CampaignPrice.name, schema: CampaignPriceSchema },
      { name: CampaignPercent.name, schema: CampaignPercentSchema },
      { name: Level.name, schema: LevelSchema },
      { name: Advertiser.name, schema: AdvertiserSchema },
      { name: ObjectionDate.name, schema: ObjectionDateSchema },
      { name: Join.name, schema: JoinSchema },
      { name: Marketer.name, schema: MarketerSchema }])],
  controllers: [CampaignAdvertiserController, CampaignAdminController, CampaignMarketerController],
  providers: [CampaignAdvertiserService, CampaignAdminService, CampaignMarketerService, AdvertiserJwtStrategy, MarketerJwtStrategy, AdvertiserAuthService, MarketerAuthService]
})
export class CampaignModule { }
