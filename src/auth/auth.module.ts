import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { User, UserSchema } from '../user/schemas';
import { AdvertiserAuthController, UserAuthController } from './controller';
import { AdvertiserAuthService, UserAuthService } from './service';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => (
      { secret: process.env.ACCESS_TOKEN_SECRET, signOptions: { expiresIn: process.env.EXPIRE_T } }
    )
  }), MongooseModule.forFeature([
    { name: Advertiser.name, schema: AdvertiserSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [AdvertiserAuthController, UserAuthController],
  providers: [AdvertiserAuthService, UserAuthService],
})
export class AuthModule { }
