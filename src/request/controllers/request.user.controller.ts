import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRequestService } from '../service';
import { IdDto } from '../../common/dto';
import { UserJwtGuard } from '../../auth/Guard';
import { QueryRequired } from '../../common/decorator';

@UseGuards(UserJwtGuard)
@Controller('user/product')
export class UserRequestController {
  constructor(private userRequestService: UserRequestService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @QueryRequired('category') category: IdDto) {
    return this.userRequestService.getRequests({ page, paging }, category)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.userRequestService.getRequestDetails(_id)
  }

  @Post()
  create() {
    return {}
  }
}
