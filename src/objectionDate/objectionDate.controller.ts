import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../auth/Guard';
import { CreateObjectionDateDto } from './dto';
import { ObjectionDateService } from './objectionDate.service';

@UseGuards(BasicGuard)
@Controller('admin/objectionDate')
export class ObjectionDateController {
  constructor(private objectionDateService: ObjectionDateService) { }

  @Get()
  get() {
    return this.objectionDateService.getObjectionDate()
  }

  @Post()
  create(@Body() createObjectionDateDto: CreateObjectionDateDto) {
    return this.objectionDateService.createObjectionDate(createObjectionDateDto)
  }

}
