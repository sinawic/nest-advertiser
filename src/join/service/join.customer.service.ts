import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Join, JoinBuyLink, JoinDiscountCode } from '../schemas';
import { JoinBuyLinkDto, JoinShareLinkDto, JoinDiscountCodeDto } from '../dto';

@Injectable()
export class JoinCustomerService {
  constructor(
    @InjectModel(Join.name) private joinModel: Model<any>,
    @InjectModel(JoinBuyLink.name) private joinBuyLinkModel: Model<any>,
    @InjectModel(JoinDiscountCode.name) private joinDiscountCodeModel: Model<any>,
  ) { }

  joinBuyLink = async (joinBuyLinkDto: JoinBuyLinkDto) => {
    try {
      // check if code is valid
      const join = await this.joinModel.findOne({ code: joinBuyLinkDto.code, type: 'buy_link' })
      if (!join)
        throw new HttpException({ message: 'code invalid' }, HttpStatus.BAD_REQUEST)

      if (new Date(join.start_date) < new Date() && new Date() < new Date(join.end_date)) {
        // update join used count
        join.used_count++
        await join.save()

        return await new this.joinBuyLinkModel({
          ...joinBuyLinkDto,
          campaign: join.campaign,
          join: join._id
        }).save()
      } else
        throw new HttpException({ message: 'code expired' }, HttpStatus.BAD_REQUEST)

    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  joinShareLink = async (joinShareLinkDto: JoinShareLinkDto) => {
    try {
      // check if code is valid
      const join = await this.joinModel.findOne({ code: joinShareLinkDto.code, type: 'share_link' })
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

  joinDiscountCode = async (joinDiscountCodeDto: JoinDiscountCodeDto) => {
    try {
      // check if code is valid
      const join = await this.joinModel.findOne({ code: joinDiscountCodeDto.code, type: 'discount_code' })
      if (!join)
        throw new HttpException({ message: 'code invalid' }, HttpStatus.BAD_REQUEST)

      if (new Date(join.start_date) < new Date() && new Date() < new Date(join.end_date)) {
        const joinDiscountCodes = await this.joinDiscountCodeModel.find({ join, user_unique_id: joinDiscountCodeDto.user_unique_id })
        if (join.discount_usable_count <= joinDiscountCodes.length)
          throw new HttpException({ message: 'discount code already used' }, HttpStatus.BAD_REQUEST)

        await new this.joinDiscountCodeModel({
          join, user_unique_id: joinDiscountCodeDto.user_unique_id,
          campaign: join.campaign
        }).save()
        // update join used count
        join.used_count++
        await join.save()

        return { message: 'success', discount_percent: join.discount_percent }
      } else
        throw new HttpException({ message: 'code expired' }, HttpStatus.BAD_REQUEST)

    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
