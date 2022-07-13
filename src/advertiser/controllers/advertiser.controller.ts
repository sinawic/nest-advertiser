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


@Controller('admin/supporters')
export class AdvertiserController {
  constructor(private advertiserService: AdvertiserService) { }

  @UseGuards(BasicGuard)
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

  @Post()
  post(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.createAdvertiser(createAdvertiserDto)
  }

  @Put(':_id')
  put(
    @Param('_id') _id: IdDto,
    @Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.editAdvertiser({ ...createAdvertiserDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.advertiserService.deleteAdvertiser(_id)
  }

}
