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
import { BasicGuard } from '../auth/Guard';
import { UserService } from './user.service';
import { IdDto } from '../common/dto';


@UseGuards(BasicGuard)
@Controller('xuser')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.userService.getUsers({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.userService.getUserDetails(_id)
  }

  @Patch(':_id')
  activate(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.userService.activateUser({ active: body.active, _id })
  }

  @Patch('verify/:_id')
  verify(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.userService.verifyUser({ active: body.verified, _id })
  }
}
