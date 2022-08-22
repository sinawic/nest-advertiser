import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Join } from '../schemas';
import { JoinIntroducerCodeDto } from '../dto';

@Injectable()
export class JoinAdvertizerService {
  constructor(
    @InjectModel(Join.name) private joinModel: Model<any>,
  ) { }

  joinIntroducerCode = async (joinIntroducerCodeDto: JoinIntroducerCodeDto, advertizer) => {
    try {
      // check if code is valid
      const join = await this.joinModel.findOne({ code: joinIntroducerCodeDto.code, type: 'introducer_code', advertizer })
      if (!join)
        throw new HttpException({ message: 'code invalid' }, HttpStatus.BAD_REQUEST)

      if (new Date(join.start_date) < new Date() && new Date() < new Date(join.end_date)) {
        // update join used count
        join.used_count++
        await join.save()

        return { message: 'success' }
      } else
        throw new HttpException({ message: 'code expired' }, HttpStatus.BAD_REQUEST)

    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
