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
import { CampaignPriceService } from '../campaignPrice.service'
import { CreateCampaignPriceDto } from '../dto';
import { IdDto } from '../../common/dto';
import { serviceTypes } from '../../common/utils';

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
    if (serviceTypes.indexOf(createCampaignPriceDto.campaign_type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)

    if (createCampaignPriceDto.campaign_type === 'share_link' && !createCampaignPriceDto.link_price)
      throw new HttpException({ message: 'link_price field required' }, HttpStatus.BAD_REQUEST)
    return this.campaignPriceService.createCampaignPrice(createCampaignPriceDto)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createCampaignPriceDto: CreateCampaignPriceDto) {
    if (serviceTypes.indexOf(createCampaignPriceDto.campaign_type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)

    if (createCampaignPriceDto.campaign_type === 'share_link' && !createCampaignPriceDto.link_price)
      throw new HttpException({ message: 'link_price field required' }, HttpStatus.BAD_REQUEST)

    return this.campaignPriceService.editCampaignPrice({ ...createCampaignPriceDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.campaignPriceService.deleteCampaignPrice(_id)
  }

}
