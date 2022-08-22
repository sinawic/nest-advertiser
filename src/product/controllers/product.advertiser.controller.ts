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
import { AdvertiserJwtGuard } from '../../auth/Guard';
import { AdvertiserProductService } from '../service';
import { CreateProductDto } from '../dto';
import { IdDto } from '../../common/dto';
import { AdvertizerDecorator } from 'src/auth/decorator';

@UseGuards(AdvertiserJwtGuard)
@Controller('advertiser/product')
export class AdvertiserProductController {
  constructor(private advertiserProductService: AdvertiserProductService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @AdvertizerDecorator() advertiser) {
    return this.advertiserProductService.getProducts({ page, paging }, advertiser)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @AdvertizerDecorator() advertiser) {
    return this.advertiserProductService.getProductDetails(_id, advertiser)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto, @AdvertizerDecorator() advertiser) {
    return this.advertiserProductService.createProduct(createProductDto, advertiser)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createProductDto: CreateProductDto) {
    return this.advertiserProductService.editProduct({ ...createProductDto, _id })
  }

  @Patch(':_id')
  toggle(
    @Param('_id') _id: IdDto,
    @Body() body) {
    return this.advertiserProductService.toggleProduct({ state: body.active, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.advertiserProductService.deleteProduct(_id)
  }

}
