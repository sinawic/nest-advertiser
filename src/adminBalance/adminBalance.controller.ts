import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../auth/Guard';
import { AdminBalanceService } from './adminBalance.service';

@UseGuards(BasicGuard)
@Controller('admin/balance')
export class AdminBalanceController {
  constructor(private adminBalanceService: AdminBalanceService) { }

  @Get()
  getList() {
    return this.adminBalanceService.getAdminBalance()
  }

}
