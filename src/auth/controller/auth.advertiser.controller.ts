import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateAdvertisererDto, LoginAdvertisererDto } from '../dto';
import { AuthService } from '../auth.service';

@Controller('advertiser/')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() loginAdvertisererDto: LoginAdvertisererDto) {
    return this.authService.validateAdvertiserLogin(loginAdvertisererDto)
  }

  @Post('register')
  register(@Body() createAdvertisererDto: CreateAdvertisererDto) {
    return this.authService.registerAdvertiser(createAdvertisererDto)
  }

}
