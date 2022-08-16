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
import { CampaignPercentService } from '../campaignPercent.service'
import { CreateCampaignPercentDto } from '../dto';
import { IdDto } from '../../common/dto';

@UseGuards(BasicGuard)
@Controller('admin/campaignPercent')
export class CampaignPercentAdminController {
  constructor(private campaignPercentService: CampaignPercentService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.campaignPercentService.getCampaignPercents({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.campaignPercentService.getCampaignPercentDetails(_id)
  }

  @Post()
  create(@Body() createCampaignPercentDto: CreateCampaignPercentDto) {
    return this.campaignPercentService.createCampaignPercent(createCampaignPercentDto)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createCampaignPercentDto: CreateCampaignPercentDto) {
    return this.campaignPercentService.editCampaignPercent({ ...createCampaignPercentDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.campaignPercentService.deleteCampaignPercent(_id)
  }

}
