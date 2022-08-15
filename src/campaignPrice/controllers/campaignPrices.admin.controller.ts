import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/Guard';
import { CampaignPriceService } from '../campaignPrice.service'
import { CreateCampaignPriceDto } from '../dto';
import { IdDto } from '../../common/dto';

@UseGuards(BasicGuard)
@Controller('admin/campaignPrice')
export class CampaignPriceAdminController {
  constructor(private campaignPriceService: CampaignPriceService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.campaignPriceService.getCampaignPrices({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.campaignPriceService.getCampaignPriceDetails(_id)
  }

  @Post()
  create(@Body() createCampaignPriceDto: CreateCampaignPriceDto) {
    return this.campaignPriceService.createCampaignPrice(createCampaignPriceDto)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createCampaignPriceDto: CreateCampaignPriceDto) {
    return this.campaignPriceService.editCampaignPrice({ ...createCampaignPriceDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.campaignPriceService.deleteCampaignPrice(_id)
  }

}
