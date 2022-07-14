import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/schemas';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sha1 } from '../../common/utils';
import { CreateUserDto, LoginUserDto } from '../dto';

@Injectable()
export class UserAuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<any>
  ) { }

  validateUserLogin = async (loginUserDto: LoginUserDto) => {
    try {
      const user = await this.userModel.findOne({
        ...loginUserDto, password: sha1(loginUserDto.password), active: true
      })
      if (!user)
        throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST)

      return this.signToken(user);
    } catch (error: any) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  registerUser = async (createUserDto: CreateUserDto) => {
    try {
      return await new this.userModel({
        ...createUserDto,
        date_created: new Date(),
        password: sha1(createUserDto.password)
      }).save()
    } catch (error: any) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  async signToken({ _id, username }): Promise<{ access_token: string }> {
    const token = await this.jwt.signAsync(
      { _id, username }
    );

    return {
      access_token: token,
    };
  }

  getRequesterUser = async ({ _id }) => {
    return await this.userModel.findOne({
      _id
    }).select('-password')
  }

}
