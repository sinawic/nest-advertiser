import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/Guard';
import { MarketerDiscountPriceService } from '../services'
import { CreateMarketerDiscountPriceDto } from '../dto';
import { IdDto } from '../../common/dto';

@UseGuards(BasicGuard)
@Controller('admin/marketerDiscountPrice')
export class MarketerDiscountPriceAdminController {
  constructor(private marketerDiscountPriceService: MarketerDiscountPriceService) { }

  @Get()
  get() {
    return this.marketerDiscountPriceService.getMarketerDiscountPrice()
  }

  @Post()
  create(@Body() createMarketerDiscountPriceDto: CreateMarketerDiscountPriceDto) {
    return this.marketerDiscountPriceService.createMarketerDiscountPrice(createMarketerDiscountPriceDto)
  }

}
