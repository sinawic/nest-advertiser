import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertiser, AdvertiserSchema } from '../advertiser/schemas';
import { AuthController } from './controller/auth.advertiser.controller';
import { AuthService } from './service';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => (
      { secret: process.env.ACCESS_TOKEN_SECRET, signOptions: { expiresIn: process.env.EXPIRE_T } }
    )
  }), MongooseModule.forFeature([{ name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
