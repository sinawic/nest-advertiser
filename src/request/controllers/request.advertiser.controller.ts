import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdvertiserRequestService } from '../service';
import { IdDto } from '../../common/dto';
import { AdvertiserJwtGuard } from '../../auth/Guard';
import { GetUser } from '../../auth/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateAttachmentDto } from '../dto';

const path = require('path')

@UseGuards(AdvertiserJwtGuard)
@Controller('advertiser/request')
export class AdvertiserRequestController {
  constructor(private advertiserRequestService: AdvertiserRequestService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @GetUser() advertiser) {
    return this.advertiserRequestService.getRequests({ page, paging }, advertiser)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @GetUser() advertiser) {
    return this.advertiserRequestService.getRequestDetails(_id, advertiser)
  }

  @Post(':_id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/advertiser_requests',
      filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
    })
  }))
  async verify(@Param('_id') _id: IdDto, @GetUser() advertiser, @UploadedFile() file: CreateAttachmentDto) {
    const req = await this.advertiserRequestService.verifyRequest(_id, advertiser, file)


    return ({ req })
  }
}
