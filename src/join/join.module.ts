import { Module } from '@nestjs/common';
import { JoinMarketerController } from './controllers';
import { JoinMarketerService } from './service';

import { MongooseModule } from '@nestjs/mongoose';

import { Join, JoinSchema } from './schemas';
import { MarketerJwtStrategy } from '../auth/Strategy';
import { Marketer, MarketerSchema } from '../marketer/schemas';
import { JwtModule } from '@nestjs/jwt';
import { MarketerAuthService } from '../auth/service';
import { Level, LevelSchema } from '../level/schemas';
import { Campaign, CampaignSchema } from '../campaign/schemas';
import { MarketerCampaignPrice, MarketerCampaignPriceSchema } from '../marketerCampaignPrice/schemas';


@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Join.name, schema: JoinSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Level.name, schema: LevelSchema },
      { name: Marketer.name, schema: MarketerSchema },
      { name: MarketerCampaignPrice.name, schema: MarketerCampaignPriceSchema }])],
  controllers: [JoinMarketerController],
  providers: [JoinMarketerService, MarketerJwtStrategy, MarketerAuthService]
})
export class JoinModule { }
