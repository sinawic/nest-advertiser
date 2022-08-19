import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/Guard';
import { CampaignAdminService } from '../service';
import { IdDto } from '../../common/dto';
import { campaignStates } from '../../common/utils';

@UseGuards(BasicGuard)
@Controller('admin/campaign')
export class CampaignAdminController {
  constructor(private campaignAdminService: CampaignAdminService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.campaignAdminService.getCampaigns({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.campaignAdminService.getCampaignDetails(_id)
  }

  @Patch(':_id')
  object(
    @Param('_id') _id: IdDto,
    @Body() { state, approved }: { state: string, approved: boolean }) {
    return this.campaignAdminService.objectCampaign({ state, _id }, approved)
  }

}
