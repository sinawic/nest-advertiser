import { Module } from '@nestjs/common';
import { CategoryController, CategoryAdminController } from './controllers';
import { CategoryService } from './category.service';

import { MongooseModule } from '@nestjs/mongoose';

import { Category, CategorySchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [CategoryController, CategoryAdminController],
  providers: [CategoryService, BasicStrategy]
})
export class CategoryModule { }
