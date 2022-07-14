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
import { JwtGuard } from '../../auth/Guard';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto';
import { IdDto } from '../../common/dto';
import { GetAdvertiser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('advertiser/product')
export class ProductAdvertiserController {
  constructor(private productService: ProductService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @GetAdvertiser() advertiser) {
    return this.productService.getProducts({ page, paging }, advertiser)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @GetAdvertiser() advertiser) {
    return this.productService.getProductDetails(_id, advertiser)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto, @GetAdvertiser() advertiser) {
    return this.productService.createProduct(createProductDto, advertiser)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createProductDto: CreateProductDto) {
    return this.productService.editProduct({ ...createProductDto, _id })
  }

  @Patch(':_id')
  toggle(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.productService.toggleProduct({ active: body.active, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.productService.deleteProduct(_id)
  }

}
