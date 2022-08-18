import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Marketer, MarketerSchema } from '../marketer/schemas';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { User, UserSchema } from '../user/schemas';
import { AdvertiserAuthController, UserAuthController, MarketerAuthController } from './controller';
import { AdvertiserAuthService, UserAuthService, MarketerAuthService } from './service';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => (
      { secret: process.env.ACCESS_TOKEN_SECRET, signOptions: { expiresIn: process.env.EXPIRE_T } }
    )
  }), MongooseModule.forFeature([
    { name: Marketer.name, schema: MarketerSchema },
    { name: Advertiser.name, schema: AdvertiserSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [AdvertiserAuthController, UserAuthController, MarketerAuthController],
  providers: [AdvertiserAuthService, UserAuthService, MarketerAuthService],
})
export class AuthModule { }
