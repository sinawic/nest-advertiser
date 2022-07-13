import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Advertiser } from '../advertiser/schemas';

import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sha1 } from '../common/utils';
import { CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(Advertiser.name) private advertiserModel: Model<any>
  ) { }


  getAdvertiserByCred = async ({ username, password, room }: { username: string, password: string, room: string }) => {
    return await this.advertiserModel.findOne({
      username, room, password: sha1(password), active: true
    })
  }

  validateLogin = async (createUserDto: CreateUserDto) => {
    try {
      const advertiser = await this.getAdvertiserByCred(createUserDto)
      if (!advertiser)
        throw new HttpException('Invalid username or password or wrong room', HttpStatus.BAD_REQUEST)

      return this.signToken(advertiser);
    } catch (error: any) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  async signToken({ _id, username, room }): Promise<{ access_token: string }> {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const token = await this.jwt.signAsync(
      { _id, username, room }
    );

    return {
      access_token: token,
    };
  }

  getRequesterAdvertiser = async ({ _id, room }) => {
    return await this.advertiserModel.findOne({
      _id,
      room, active: true
    })
  }

}
