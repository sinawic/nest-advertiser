import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdvertiserJwtGuard } from '../../auth/Guard';
import { CampaignAdvertiserService } from '../service';
import { CreateAttachmentDto, CreateCampaignDto } from '../dto';
import { IdDto } from '../../common/dto';
import { AdvertizerDecorator } from 'src/auth/decorator';
import { campaignStates, serviceTypes } from '../../common/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const path = require('path')

@UseGuards(AdvertiserJwtGuard)
@Controller('advertiser/campaign')
export class CampaignAdvertiserController {
  constructor(private campaignAdvertiserService: CampaignAdvertiserService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number,
    @AdvertizerDecorator() advertiser) {
    return this.campaignAdvertiserService.getCampaigns({ page, paging }, advertiser)
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto, @AdvertizerDecorator() advertiser) {
    return this.campaignAdvertiserService.getCampaignDetails(_id, advertiser)
  }

  @Post()
  @UseInterceptors(FileInterceptor('pic', {
    storage: diskStorage({
      destination: './uploads/campaign',
      filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
    })
  }))
  create(@UploadedFile() pic: CreateAttachmentDto, @Body() createCampaignDto: CreateCampaignDto, @AdvertizerDecorator() advertiser) {
    if (serviceTypes.indexOf(createCampaignDto.type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)
    return this.campaignAdvertiserService.createCampaign(createCampaignDto, advertiser, pic)
  }

  @Put(':_id')
  @UseInterceptors(FileInterceptor('pic', {
    storage: diskStorage({
      destination: './uploads/campaign',
      filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
    })
  }))
  edit(
    @UploadedFile() pic: CreateAttachmentDto,
    @Param('_id') _id: IdDto,
    @Body() createCampaignDto: CreateCampaignDto, @AdvertizerDecorator() advertiser) {
    return this.campaignAdvertiserService.editCampaign({ ...createCampaignDto, _id }, advertiser, pic)
  }

  @Patch(':_id')
  toggle(
    @Param('_id') _id: IdDto,
    @Body() { state }: { state: string }, @AdvertizerDecorator() advertiser) {
    delete campaignStates[0]
    if (campaignStates.indexOf(state) === -1)
      throw new HttpException({ message: 'campaign state unsupported' }, HttpStatus.BAD_REQUEST)
    return this.campaignAdvertiserService.toggleCampaign({ state, _id }, advertiser)
  }

  @Patch('object/:_id')
  object(
    @Param('_id') _id: IdDto,
    @Body() { state }: { state: string }, @AdvertizerDecorator() advertiser) {
    return this.campaignAdvertiserService.objectCampaign({ state, _id }, advertiser)
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto, @AdvertizerDecorator() advertiser) {
    return this.campaignAdvertiserService.deleteCampaign(_id, advertiser)
  }

  @Delete('pic/:_id')
  deletePic(@Param('_id') _id: IdDto, @AdvertizerDecorator() advertiser) {
    return this.campaignAdvertiserService.deleteCampaignPic(_id, advertiser)
  }

}
