import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from '../product.service';
import { IdDto } from '../../common/dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.productService.getProducts({ page, paging }, true)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.productService.getProductDetails(_id, true)
  }
}
