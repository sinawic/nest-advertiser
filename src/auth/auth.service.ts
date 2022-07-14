import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Advertiser } from '../advertiser/schemas';

import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sha1 } from '../common/utils';
import { CreateAdvertisererDto, LoginAdvertisererDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(Advertiser.name) private advertiserModel: Model<any>
  ) { }


  getAdvertiserByCred = async ({ username, password }: { username: string, password: string }) => {
    return await this.advertiserModel.findOne({
      username, password: sha1(password)
    })
  }

  validateAdvertiserLogin = async (loginAdvertisererDto: LoginAdvertisererDto) => {
    try {
      const advertiser = await this.getAdvertiserByCred(loginAdvertisererDto)
      if (!advertiser)
        throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST)

      return this.signToken(advertiser);
    } catch (error: any) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  registerAdvertiser = async (createAdvertisererDto: CreateAdvertisererDto) => {
    try {
      return await new this.advertiserModel({
        ...createAdvertisererDto,
        date_created: new Date(),
        password: sha1(createAdvertisererDto.password)
      }).save()
    } catch (error: any) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  async signToken({ _id, username, active }): Promise<{ access_token: string }> {
    const token = await this.jwt.signAsync(
      { _id, username, active }
    );

    return {
      access_token: token,
    };
  }

  getRequesterAdvertiser = async ({ _id }) => {
    return await this.advertiserModel.findOne({
      _id
    })
  }

}
