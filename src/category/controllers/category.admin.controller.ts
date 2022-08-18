import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/Guard';
import { CategoryService } from '../category.service';
import { CreateCategoryDto } from '../dto';
import { IdDto } from '../../common/dto';

@UseGuards(BasicGuard)
@Controller('admin/category')
export class CategoryAdminController {
  constructor(private categoryService: CategoryService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.categoryService.getCategories({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.categoryService.getCategoryDetails(_id)
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.editCategory({ ...createCategoryDto, _id })
  }

  @Patch(':_id')
  toggle(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.categoryService.toggleCategory({ state: body.active, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.categoryService.deleteCategory(_id)
  }

}
