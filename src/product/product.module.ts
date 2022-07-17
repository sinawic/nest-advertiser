import { Module } from '@nestjs/common';
import { UserProductController, AdvertiserProductController } from './controllers';
import { AdvertiserProductService, UserProductService } from './service';

import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './schemas';
import { AdvertiserJwtStrategy, UserJwtStrategy } from '../auth/Strategy';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { User, UserSchema } from '../user/schemas';
import { JwtModule } from '@nestjs/jwt';
import { AdvertiserAuthService, UserAuthService } from '../auth/service';
import { Category, CategorySchema } from '../category/schemas';
import { Request, RequestSchema } from '../request/schemas';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [UserProductController, AdvertiserProductController],
  providers: [AdvertiserProductService, UserProductService, AdvertiserJwtStrategy, UserJwtStrategy, UserAuthService, AdvertiserAuthService]
})
export class ProductModule { }
