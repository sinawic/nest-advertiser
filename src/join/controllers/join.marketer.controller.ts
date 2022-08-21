import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MarketerJwtGuard } from '../../auth/Guard';
import { JoinMarketerService } from '../service';
import { IdDto } from '../../common/dto';
import { MarketerDecorator } from 'src/auth/decorator/marketer.decorator';
import { JoinDto } from '../dto';

@UseGuards(MarketerJwtGuard)
@Controller('marketer/join')
export class JoinMarketerController {
  constructor(private joinMarketerService: JoinMarketerService) { }

  @Get()
  getList(
    @MarketerDecorator() marketer,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.joinMarketerService.getJoins({ page, paging }, marketer)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @MarketerDecorator() marketer) {
    return this.joinMarketerService.getJoinDetails(_id, marketer)
  }

  @Post()
  join(@Body() joinDto: JoinDto, @MarketerDecorator() marketer) {
    return this.joinMarketerService.joinCampaign(joinDto, marketer)
  }
}
