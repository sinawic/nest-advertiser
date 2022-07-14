import { Module } from '@nestjs/common';
import { ProductController, ProductAdvertiserController } from './controllers';
import { ProductService } from './product.service';

import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './schemas';
import { JwtStrategy } from '../auth/Strategy';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/service';
import { Category, CategorySchema } from '../category/schemas';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [ProductController, ProductAdvertiserController],
  providers: [ProductService, JwtStrategy, AuthService]
})
export class ProductModule { }
