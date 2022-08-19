import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MarketerJwtGuard } from '../../auth/Guard';
import { CampaignMarketerService } from '../service';
import { IdDto } from '../../common/dto';
import { MarketerDecorator } from 'src/auth/decorator/marketer.decorator';

@UseGuards(MarketerJwtGuard)
@Controller('marketer/campaign')
export class CampaignMarketerController {
  constructor(private campaignMarketerService: CampaignMarketerService) { }

  @Get()
  getList(
    @MarketerDecorator() marketer,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.campaignMarketerService.getCampaigns({ page, paging }, marketer)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @MarketerDecorator() marketer) {
    return this.campaignMarketerService.getCampaignDetails(_id, marketer)
  }
}
