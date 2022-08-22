import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JoinAdvertizerService } from '../service';
import { JoinIntroducerCodeDto } from '../dto';
import { AdvertiserJwtGuard } from '../../auth/Guard';
import { AdvertizerDecorator } from 'src/auth/decorator';

@UseGuards(AdvertiserJwtGuard)
@Controller('advertizer/join')
export class JoinAdvertizerController {
  constructor(private joinAdvertizerService: JoinAdvertizerService) { }


  @Post('introducerCode')
  joinIntroducerCode(@Body() joinIntroducerCodeDto: JoinIntroducerCodeDto, @AdvertizerDecorator() advertiser) {
    return this.joinAdvertizerService.joinIntroducerCode(joinIntroducerCodeDto, advertiser)
  }
}
