import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { pageTypes } from '../../common/utils';
import { CreateAdvertizerDto, LoginAdvertizerDto } from '../dto';
import { AdvertiserAuthService } from '../service';

@Controller('advertiser/')
export class AdvertiserAuthController {
  constructor(private authService: AdvertiserAuthService) { }

  @Post('login')
  login(@Body() loginAdvertizerDto: LoginAdvertizerDto) {
    return this.authService.validateAdvertiserLogin(loginAdvertizerDto)
  }

  @Post('register')
  register(@Body() createAdvertizerDto: CreateAdvertizerDto) {
    if (pageTypes.indexOf(createAdvertizerDto.page_type) === -1)
      throw new HttpException({ message: 'page type unsupported' }, HttpStatus.BAD_REQUEST)
    return this.authService.registerAdvertiser(createAdvertizerDto)
  }

}
