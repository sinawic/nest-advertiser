import { Module } from '@nestjs/common';
import { UserRequestController, AdvertiserRequestController, AdminRequestController } from './controllers';
import { UserRequestService, AdvertiserRequestService, AdminRequestService } from './service';

import { MongooseModule } from '@nestjs/mongoose';

import { Attachment, AttachmentSchema, Request, RequestSchema } from './schemas';
import { AdvertiserJwtStrategy, UserJwtStrategy } from '../auth/Strategy';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { User, UserSchema } from '../user/schemas';
import { Product, ProductSchema } from '../product/schemas';
import { JwtModule } from '@nestjs/jwt';
import { AdvertiserAuthService, UserAuthService } from '../auth/service';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Attachment.name, schema: AttachmentSchema },
      { name: User.name, schema: UserSchema },
      { name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [UserRequestController, AdvertiserRequestController, AdminRequestController],
  providers: [UserRequestService, AdvertiserRequestService, AdminRequestService, AdvertiserJwtStrategy, UserJwtStrategy, UserAuthService, AdvertiserAuthService]
})
export class RequestModule { }
