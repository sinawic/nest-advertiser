import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminRequestService } from '../service';
import { IdDto } from '../../common/dto';
import { BasicGuard } from '../../auth/Guard';
import { GetUser } from '../../auth/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateAttachmentDto } from '../dto';

const path = require('path')

@UseGuards(BasicGuard)
@Controller('admin/request')
export class AdminRequestController {
  constructor(private adminRequestService: AdminRequestService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.adminRequestService.getRequests({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.adminRequestService.getRequestDetails(_id)
  }

  @Patch(':_id')
  toggle(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.adminRequestService.toggleRequest({ state: body.active, _id })
  }
}
