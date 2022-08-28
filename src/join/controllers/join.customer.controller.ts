import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { JoinCustomerService } from '../service';
import { JoinBuyLinkDto, JoinShareLinkDto, JoinDiscountCodeDto } from '../dto';
import { RealIP } from 'nestjs-real-ip';

@Controller('customer/join')
export class JoinCustomerController {
  constructor(private joinCustomerService: JoinCustomerService) { }


  @Post('buyLink')
  joinBuyLink(@Body() joinBuyLinkDto: JoinBuyLinkDto) {
    return this.joinCustomerService.joinBuyLink(joinBuyLinkDto)
  }

  @Post('shareLink')
  joinShareLink(@Body() joinShareLinkDto: JoinShareLinkDto, @RealIP() ip: string) {
    return this.joinCustomerService.joinShareLink(joinShareLinkDto, ip)
  }

  @Get('shareLink/:code')
  get(@Param('code') code: string, @RealIP() ip: string) {
    return this.joinCustomerService.preJoinShareLink(code, ip)
  }

  @Post('discountCode')
  joinDiscountCode(@Body() joinDiscountCodeDto: JoinDiscountCodeDto) {
    return this.joinCustomerService.joinDiscountCode(joinDiscountCodeDto)
  }
}
