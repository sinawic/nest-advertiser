import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LevelService } from '../level.service';
import { IdDto } from '../../common/dto';

@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.levelService.getLevels({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.levelService.getLevelDetails(_id)
  }
}
