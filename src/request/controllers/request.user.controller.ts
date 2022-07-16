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
import { GetUser } from '../../auth/decorator';

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
  create(@Param('_id') _id: IdDto, @GetUser() user) {
    return this.userRequestService.createRequest(_id, user)
  }
}
