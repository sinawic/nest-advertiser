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
import { AdvertiserJwtGuard } from '../../auth/Guard';
import { CampaignAdvertiserService } from '../service';
import { CreateCampaignDto } from '../dto';
import { IdDto } from '../../common/dto';
import { GetUser } from 'src/auth/decorator';
import { campaignStates, serviceTypes } from '../../common/utils';

@UseGuards(AdvertiserJwtGuard)
@Controller('advertiser/campaign')
export class CampaignAdvertiserController {
  constructor(private campaignAdvertiserService: CampaignAdvertiserService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @GetUser() advertiser) {
    return this.campaignAdvertiserService.getCampaigns({ page, paging }, advertiser)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @GetUser() advertiser) {
    return this.campaignAdvertiserService.getCampaignDetails(_id, advertiser)
  }

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto, @GetUser() advertiser) {
    if (serviceTypes.indexOf(createCampaignDto.type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)
    return this.campaignAdvertiserService.createCampaign(createCampaignDto, advertiser)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createCampaignDto: CreateCampaignDto, @GetUser() advertiser) {
    return this.campaignAdvertiserService.editCampaign({ ...createCampaignDto, _id }, advertiser)
  }

  @Patch(':_id')
  toggle(
    @Param('_id') _id: IdDto,
    @Body() { state }: { state: string }, @GetUser() advertiser) {
    delete campaignStates[0]
    if (campaignStates.indexOf(state) === -1)
      throw new HttpException({ message: 'campaign state unsupported' }, HttpStatus.BAD_REQUEST)
    return this.campaignAdvertiserService.toggleCampaign({ state, _id }, advertiser)
  }

  @Patch('object/:_id')
  object(
    @Param('_id') _id: IdDto,
    @Body() { state }: { state: string }, @GetUser() advertiser) {
    return this.campaignAdvertiserService.objectCampaign({ state, _id }, advertiser)
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto, @GetUser() advertiser) {
    return this.campaignAdvertiserService.deleteCampaign(_id, advertiser)
  }

}
