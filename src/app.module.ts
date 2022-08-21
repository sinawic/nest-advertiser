import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { AdvertisersModule } from './advertiser/advertiser.module';
import { UsersModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RequestModule } from './request/request.module';
import { AuthModule } from './auth/auth.module';
import { LevelModule } from './level/level.module';
import { CampaignPriceModule } from './campaignPrice/campaignPrice.module';
import { CampaignPercentModule } from './campaignPercent/campaignPercent.module';
import { MarketerCampaignPriceModule } from './marketerCampaignPrice/marketerCampaignPrice.module';
import { AdminBalanceModule } from './adminBalance/adminBalance.module';
import { MarketersModule } from './marketer/marketer.module';
import { CampaignModule } from './campaign/campaign.module';
import { JoinModule } from './join/join.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    CategoryModule,
    AdvertisersModule,
    ProductModule,
    RequestModule,
    UsersModule,
    LevelModule,
    CampaignPriceModule,
    CampaignPercentModule,
    MarketerCampaignPriceModule,
    AdminBalanceModule,
    MarketersModule,
    CampaignModule,
    JoinModule,
    AuthModule
  ],
  providers: []
})
export class AppModule { }
