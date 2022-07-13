import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/Guard';
import { AdvertiserService } from '../advertiser.service';
import { CreateAdvertiserDto } from '../dto';
import { IdDto } from '../../common/dto';


@UseGuards(BasicGuard)
@Controller('admin/advertiser')
export class AdvertiserAdminController {
  constructor(private advertiserService: AdvertiserService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.advertiserService.getAdvertisers({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.advertiserService.getAdvertiserDetails(_id)
  }

  @Put(':_id')
  put(
    @Param('_id') _id: IdDto,
    @Body() active: boolean) {
    return this.advertiserService.activateAdvertiser({ active, _id })
  }


}
