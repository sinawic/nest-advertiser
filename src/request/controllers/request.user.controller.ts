import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserRequestService } from '../service';
import { IdDto } from '../../common/dto';
import { UserJwtGuard } from '../../auth/Guard';
import { GetUser } from '../../auth/decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateAttachmentDto } from '../dto';

const path = require('path')

@UseGuards(UserJwtGuard)
@Controller('user/request')
export class UserRequestController {
  constructor(private userRequestService: UserRequestService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @GetUser() user) {
    return this.userRequestService.getRequests({ page, paging }, user)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @GetUser() user) {
    return this.userRequestService.getRequestDetails(_id, user)
  }

  @Post(':_id')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './uploads/user_requests',
      filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
    })
  }))
  async create(@Param('_id') _id: IdDto, @GetUser() user, @UploadedFiles() files: Array<CreateAttachmentDto>) {
    const req = await this.userRequestService.createRequest(_id, user)

    files && files.map(async (file) => {
      await this.userRequestService.createAttachment({ ...file, request: req._id })
    })

    return ({ req })
  }
}
