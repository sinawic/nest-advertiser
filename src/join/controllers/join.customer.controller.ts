import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { JoinCustomerService } from '../service';
import { JoinBuyLinkDto, JoinShareLinkDto, JoinDiscountCodeDto } from '../dto';

@Controller('customer/join')
export class JoinCustomerController {
  constructor(private joinCustomerService: JoinCustomerService) { }


  @Post('buyLink')
  joinBuyLink(@Body() joinBuyLinkDto: JoinBuyLinkDto) {
    return this.joinCustomerService.joinBuyLink(joinBuyLinkDto)
  }

  @Post('shareLink')
  joinShareLink(@Body() joinShareLinkDto: JoinShareLinkDto) {
    return this.joinCustomerService.joinShareLink(joinShareLinkDto)
  }

  @Post('discountCode')
  joinDiscountCode(@Body() joinDiscountCodeDto: JoinDiscountCodeDto) {
    return this.joinCustomerService.joinDiscountCode(joinDiscountCodeDto)
  }
}
