import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/Guard';
import { MarketerCampaignPriceService } from '../marketerCampaignPrice.service'
import { CreateMarketerCampaignPriceDto } from '../dto';
import { IdDto } from '../../common/dto';

@UseGuards(BasicGuard)
@Controller('admin/marketerCampaignPrice')
export class MarketerCampaignPriceAdminController {
  constructor(private marketerCampaignPriceService: MarketerCampaignPriceService) { }

  @Get()
  getById() {
    return this.marketerCampaignPriceService.getMarketerCampaignPrice()
  }

  @Post()
  create(@Body() createMarketerCampaignPriceDto: CreateMarketerCampaignPriceDto) {
    return this.marketerCampaignPriceService.createMarketerCampaignPrice(createMarketerCampaignPriceDto)
  }

}
