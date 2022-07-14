import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/Guard';
import { AdvertiserService } from '../advertiser.service';
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

  @Patch(':_id')
  activate(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.advertiserService.activateAdvertiser({ active: body.active, _id })
  }

  @Patch('verify/:_id')
  verify(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.advertiserService.verifyAdvertiser({ active: body.verified, _id })
  }
}
