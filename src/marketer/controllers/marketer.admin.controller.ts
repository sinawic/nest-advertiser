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
import { MarketerService } from '../marketer.service';
import { IdDto } from '../../common/dto';


@UseGuards(BasicGuard)
@Controller('admin/marketer')
export class MarketerAdminController {
  constructor(private marketerService: MarketerService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.marketerService.getMarketers({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.marketerService.getMarketerDetails(_id)
  }

  @Patch(':_id')
  activate(
    @Param('_id') _id: IdDto,
    @Body() { active }) {
    return this.marketerService.activateMarketer({ state: active, _id })
  }

  @Patch('verify/:_id')
  verify(
    @Param('_id') _id: IdDto,
    @Body() { verified }) {
    return this.marketerService.verifyMarketer({ state: verified, _id })
  }

  @Patch('level/:_id')
  assignLevel(
    @Param('_id') _id: IdDto,
    @Body() { level }) {
    return this.marketerService.assignLevel({ level, _id })
  }
}
