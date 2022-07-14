import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Advertiser } from '../../advertiser/schemas';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sha1 } from '../../common/utils';
import { CreateUserDto, LoginUserDto } from '../dto';

@Injectable()
export class AdvertiserAuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(Advertiser.name) private advertiserModel: Model<any>
  ) { }

  validateAdvertiserLogin = async (loginUserDto: LoginUserDto) => {
    try {
      const advertiser = await this.advertiserModel.findOne({
        ...loginUserDto, password: sha1(loginUserDto.password), active: true
      })
      if (!advertiser)
        throw new HttpException('Invalid username or password or not active', HttpStatus.BAD_REQUEST)

      return this.signToken(advertiser);
    } catch (error: any) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  registerAdvertiser = async (createUserDto: CreateUserDto) => {
    try {
      return await new this.advertiserModel({
        ...createUserDto,
        date_created: new Date(),
        password: sha1(createUserDto.password)
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
    }).select('-password')
  }

}
