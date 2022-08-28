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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdvertiserJwtGuard } from '../../auth/Guard';
import { CampaignAdvertiserService } from '../service';
import { CreateAttachmentDto, CreateCampaignDto } from '../dto';
import { IdDto } from '../../common/dto';
import { AdvertizerDecorator } from 'src/auth/decorator';
import { campaignStates, serviceTypes } from '../../common/utils';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pic', maxCount: 1 },
    { name: 'product_pic', maxCount: 1 }
  ], {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (file.fieldname === "pic") {
          cb(null, './uploads/campaign/pic');
        } else {
          cb(null, './uploads/campaign/product_pic');
        }
      },
      filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
    })
  }))
  create(@UploadedFiles() files: { pic: CreateAttachmentDto, product_pic: CreateAttachmentDto }, @Body() createCampaignDto: CreateCampaignDto, @AdvertizerDecorator() advertiser) {
    if (serviceTypes.indexOf(createCampaignDto.type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)

    if (createCampaignDto.type === 'share_link' && !createCampaignDto.click_count)
      throw new HttpException({ message: 'must specify click count' }, HttpStatus.BAD_REQUEST)

    if ((createCampaignDto.type === serviceTypes[0] || createCampaignDto.type === serviceTypes[1]) &&
      !(createCampaignDto.product_title && createCampaignDto.product_description && createCampaignDto.product_price))
      throw new HttpException({ message: 'campaign product fields required' }, HttpStatus.BAD_REQUEST)

    if ((createCampaignDto.type === serviceTypes[2] || createCampaignDto.type === serviceTypes[3] || createCampaignDto.type === serviceTypes[4]) &&
      !createCampaignDto.link)
      throw new HttpException({ message: 'campaign link field required' }, HttpStatus.BAD_REQUEST)

    return this.campaignAdvertiserService.createCampaign(createCampaignDto, advertiser, files)
  }

  @Put(':_id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pic', maxCount: 1 },
    { name: 'product_pic', maxCount: 1 }
  ], {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (file.fieldname === "pic") {
          cb(null, './uploads/campaign/pic');
        } else {
          cb(null, './uploads/campaign/product_pic');
        }
      },
      filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
    })
  }))
  edit(
    @UploadedFiles() files: { pic: CreateAttachmentDto, product_pic: CreateAttachmentDto },
    @Param('_id') _id: IdDto,
    @Body() createCampaignDto: CreateCampaignDto, @AdvertizerDecorator() advertiser) {

    if (serviceTypes.indexOf(createCampaignDto.type) === -1)
      throw new HttpException({ message: 'campaign type unsupported' }, HttpStatus.BAD_REQUEST)

    if (createCampaignDto.type === 'share_link' && !createCampaignDto.click_count)
      throw new HttpException({ message: 'must specify click count' }, HttpStatus.BAD_REQUEST)

    if ((createCampaignDto.type === serviceTypes[0] || createCampaignDto.type === serviceTypes[1]) &&
      !(createCampaignDto.product_title && createCampaignDto.product_description && createCampaignDto.product_price))
      throw new HttpException({ message: 'campaign product fields required' }, HttpStatus.BAD_REQUEST)

    if ((createCampaignDto.type === serviceTypes[2] || createCampaignDto.type === serviceTypes[3] || createCampaignDto.type === serviceTypes[4]) &&
      !createCampaignDto.link)
      throw new HttpException({ message: 'campaign link field required' }, HttpStatus.BAD_REQUEST)

    return this.campaignAdvertiserService.editCampaign({ ...createCampaignDto, _id }, advertiser, files)
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

  @Patch('addclicks/:_id')
  addClicks(
    @Param('_id') _id: IdDto,
    @Body() { amount }: { amount: number }, @AdvertizerDecorator() advertiser) {
    return this.campaignAdvertiserService.addClicks({ amount, _id }, advertiser)
  }

}
