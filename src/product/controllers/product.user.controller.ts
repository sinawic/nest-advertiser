import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserProductService } from '../service';
import { IdDto } from '../../common/dto';
import { UserJwtGuard } from '../../auth/Guard';
import { QueryRequired } from '../../common/decorator';

@UseGuards(UserJwtGuard)
@Controller('user/product')
export class UserProductController {
  constructor(private userProductService: UserProductService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @QueryRequired('category') category: IdDto) {
    return this.userProductService.getProducts({ page, paging }, category)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.userProductService.getProductDetails(_id)
  }
}
