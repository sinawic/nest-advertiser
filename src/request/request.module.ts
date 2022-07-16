import { Module } from '@nestjs/common';
import { UserRequestController } from './controllers';
import { UserRequestService } from './service';

import { MongooseModule } from '@nestjs/mongoose';

import { Request, RequestSchema } from './schemas';
import { AdvertiserJwtStrategy, UserJwtStrategy } from '../auth/Strategy';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { User, UserSchema } from '../user/schemas';
import { JwtModule } from '@nestjs/jwt';
import { AdvertiserAuthService, UserAuthService } from '../auth/service';
import { Category, CategorySchema } from '../category/schemas';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
      { name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [UserRequestController],
  providers: [UserRequestService, AdvertiserJwtStrategy, UserJwtStrategy, UserAuthService, AdvertiserAuthService]
})
export class RequestModule { }
