import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto';
import { AdvertiserAuthService } from '../service';

@Controller('advertiser/')
export class AdvertiserAuthController {
  constructor(private authService: AdvertiserAuthService) { }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateAdvertiserLogin(loginUserDto)
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerAdvertiser(createUserDto)
  }

}
