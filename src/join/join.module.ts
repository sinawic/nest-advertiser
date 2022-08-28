import { Module } from '@nestjs/common';
import { JoinMarketerController, JoinCustomerController, JoinAdvertizerController } from './controllers';
import { JoinMarketerService, JoinCustomerService, JoinAdvertizerService } from './service';

import { MongooseModule } from '@nestjs/mongoose';

import {
  Join, JoinSchema, JoinBuyLink, JoinBuyLinkSchema, JoinDiscountCode, JoinDiscountCodeSchema,
  JoinShareLink, JoinShareLinkSchema
} from './schemas';
import { MarketerJwtStrategy } from '../auth/Strategy';
import { Marketer, MarketerSchema } from '../marketer/schemas';
import { JwtModule } from '@nestjs/jwt';
import { MarketerAuthService } from '../auth/service';
import { Level, LevelSchema } from '../level/schemas';
import { Campaign, CampaignSchema } from '../campaign/schemas';
import { CampaignPrice, CampaignPriceSchema } from '../campaignPrice/schemas';
import { CampaignPercent, CampaignPercentSchema } from '../campaignPercent/schemas';
import { AdminBalance, AdminBalanceSchema } from '../adminBalance/schemas';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import {
  MarketerCampaignPrice, MarketerCampaignPriceSchema,
  MarketerDiscountPrice, MarketerDiscountPriceSchema
} from '../marketerCampaignPrice/schemas';


@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Join.name, schema: JoinSchema },
      { name: AdminBalance.name, schema: AdminBalanceSchema },
      { name: JoinBuyLink.name, schema: JoinBuyLinkSchema },
      { name: JoinShareLink.name, schema: JoinShareLinkSchema },
      { name: JoinDiscountCode.name, schema: JoinDiscountCodeSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: CampaignPrice.name, schema: CampaignPriceSchema },
      { name: CampaignPercent.name, schema: CampaignPercentSchema },
      { name: Advertiser.name, schema: AdvertiserSchema },
      { name: Level.name, schema: LevelSchema },
      { name: Marketer.name, schema: MarketerSchema },
      { name: MarketerCampaignPrice.name, schema: MarketerCampaignPriceSchema },
      { name: MarketerDiscountPrice.name, schema: MarketerDiscountPriceSchema }])],
  controllers: [JoinMarketerController, JoinCustomerController, JoinAdvertizerController],
  providers: [JoinMarketerService, JoinCustomerService, JoinAdvertizerService, MarketerJwtStrategy, MarketerAuthService]
})
export class JoinModule { }
