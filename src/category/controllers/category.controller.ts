import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../category.service';
import { IdDto } from '../../common/dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.categoryService.getCategories({ page, paging }, true)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.categoryService.getCategoryDetails(_id, true)
  }
}
