import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { pageTypes } from '../../common/utils';
import { CreateMarketerDto, LoginMarketerDto } from '../dto';
import { MarketerAuthService } from '../service';

@Controller('marketer/')
export class MarketerAuthController {
  constructor(private authService: MarketerAuthService) { }

  @Post('login')
  login(@Body() loginMarketerDto: LoginMarketerDto) {
    return this.authService.validateMarketerLogin(loginMarketerDto)
  }

  @Post('register')
  register(@Body() createMarketerDto: CreateMarketerDto) {
    if (pageTypes.indexOf(createMarketerDto.page_type) === -1)
      throw new HttpException({ message: 'page type unsupported' }, HttpStatus.BAD_REQUEST)
    return this.authService.registerMarketer(createMarketerDto)
  }

}
