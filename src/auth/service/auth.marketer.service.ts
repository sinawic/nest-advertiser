import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Marketer } from '../../marketer/schemas';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sha1 } from '../../common/utils';
import { CreateUserDto, LoginUserDto } from '../dto';

@Injectable()
export class MarketerAuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(Marketer.name) private marketerModel: Model<any>
  ) { }

  validateMarketerLogin = async (loginUserDto: LoginUserDto) => {
    try {
      const marketer = await this.marketerModel.findOne({
        ...loginUserDto, password: sha1(loginUserDto.password), active: true
      })
      if (!marketer)
        throw new HttpException('Invalid username or password or not active', HttpStatus.BAD_REQUEST)

      return this.signToken(marketer);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  registerMarketer = async (createUserDto: CreateUserDto) => {
    try {
      return await new this.marketerModel({
        ...createUserDto,
        date_created: new Date(),
        password: sha1(createUserDto.password)
      }).save()
    } catch (error: any) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
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

  getRequesterMarketer = async ({ _id }) => {
    return await this.marketerModel.findOne({
      _id
    }).select('-password')
  }

}
