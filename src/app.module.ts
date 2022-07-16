import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { AdvertisersModule } from './advertiser/advertiser.module';
import { UsersModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RequestModule } from './request/request.module';
import { AuthModule } from './auth/auth.module';
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
    AuthModule
  ],
  providers: []
})
export class AppModule { }
