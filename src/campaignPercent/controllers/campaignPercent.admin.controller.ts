import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { serviceTypes } from '../../common/utils';

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
    if (serviceTypes.indexOf(createCampaignPercentDto.campaign_type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)

    if (createCampaignPercentDto.campaign_type === 'share_link' &&
      !(createCampaignPercentDto.link_admin_percent && createCampaignPercentDto.link_marketer_percent))
      throw new HttpException({ message: 'share link fields required' }, HttpStatus.BAD_REQUEST)

    return this.campaignPercentService.createCampaignPercent(createCampaignPercentDto)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createCampaignPercentDto: CreateCampaignPercentDto) {
    if (serviceTypes.indexOf(createCampaignPercentDto.campaign_type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)

    if (createCampaignPercentDto.campaign_type === 'share_link' &&
      !(createCampaignPercentDto.link_admin_percent && createCampaignPercentDto.link_marketer_percent))
      throw new HttpException({ message: 'share link fields required' }, HttpStatus.BAD_REQUEST)

    return this.campaignPercentService.editCampaignPercent({ ...createCampaignPercentDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.campaignPercentService.deleteCampaignPercent(_id)
  }

}
