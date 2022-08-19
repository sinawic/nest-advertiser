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
import { LevelService } from '../level.service'
import { CreateLevelDto } from '../dto';
import { IdDto } from '../../common/dto';

@UseGuards(BasicGuard)
@Controller('admin/level')
export class LevelAdminController {
  constructor(private levelService: LevelService) { }

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.createLevel(createLevelDto)
  }

  @Put(':_id')
  edit(
    @Param('_id') _id: IdDto,
    @Body() createLevelDto: CreateLevelDto) {
    return this.levelService.editLevel({ ...createLevelDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.levelService.deleteLevel(_id)
  }

}
