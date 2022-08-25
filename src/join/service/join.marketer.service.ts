import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Join } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';
import { JoinDto } from '../dto';
import { makeid } from 'src/common/utils';
import { Campaign } from '../../campaign/schemas';
import { MarketerCampaignPrice, MarketerDiscountPrice } from '../../marketerCampaignPrice/schemas';
import { AdminBalance } from 'src/adminBalance/schemas';

@Injectable()
export class JoinMarketerService {
  constructor(
    @InjectModel(Join.name) private joinModel: Model<any>,
    @InjectModel(Campaign.name) private campaignModel: Model<any>,
    @InjectModel(AdminBalance.name) private adminBalanceModel: Model<any>,
    @InjectModel(MarketerCampaignPrice.name) private marketerCampaignPriceModel: Model<any>,
    @InjectModel(MarketerDiscountPrice.name) private marketerDiscountPriceModel: Model<any>,
  ) { }

  getJoins = async (paginationDto: PaginationDto, marketer) => {
    try {
      const joins = await this.joinModel.find({ marketer })
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.joinModel.countDocuments({ marketer })
      return { data: joins, count }
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getJoinDetails = async (_id: IdDto, marketer) => {
    try {
      return await this.joinModel.findOne({ _id, marketer })
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  joinCampaign = async (joinDto: JoinDto, marketer) => {
    try {
      // check if marketer already joined campaign
      if (await this.joinModel.findOne({ campaign: joinDto.campaign, marketer }))
        throw new HttpException({ message: 'You have already joined this campaign' }, HttpStatus.BAD_REQUEST)

      // check if campaign is still active
      const campaign = await this.campaignModel.findOne({ _id: joinDto.campaign, admin_verified: true, level: marketer.level, end_date: { $gt: new Date() } })
      if (!campaign)
        throw new HttpException({ message: 'Campaign not found or not active' }, HttpStatus.BAD_REQUEST)


      // check if campaign price is defined and marketer has that much balance
      let campaignPrice
      if (campaign.type === 'discount_code') {
        campaignPrice = await this.marketerDiscountPriceModel.find({ percent: { $gte: campaign.discount_percent } }).sort({ percent: 1 }).limit(1)
        campaignPrice = campaignPrice[0]
        if (!campaignPrice)
          throw new HttpException({ message: 'Campaign discount price is not defined' }, HttpStatus.BAD_REQUEST)
      } else {
        campaignPrice = await this.marketerCampaignPriceModel.findOne({})
        if (!campaignPrice)
          throw new HttpException({ message: 'Campaign join price not defined yet' }, HttpStatus.BAD_REQUEST)
      }

      if (marketer.balance < campaignPrice.price)
        throw new HttpException({ message: 'Min required balance is ' + campaignPrice.price }, HttpStatus.BAD_REQUEST)

      // check if campaign is still joinable
      if (campaign.marketers_joined >= campaign.marketer_count)
        throw new HttpException({ message: 'Campaign already reached max joined count' }, HttpStatus.BAD_REQUEST)
      else {
        campaign.marketers_joined++
        await campaign.save()
      }

      // update and reduce marketer balance
      marketer.balance -= campaignPrice.price
      await marketer.save()

      // increase admin balance
      await this.adminBalanceModel.findOneAndUpdate({}, { $inc: { balance: campaignPrice.price } })

      return await new this.joinModel({
        type: campaign.type,
        end_date: campaign.end_date,
        code_price: campaignPrice.price,
        discount_usable_count: campaign.discount_usable_count,
        discount_percent: campaign.discount_percent,
        code: makeid(8),
        level: marketer.level,
        campaign: joinDto.campaign,
        marketer,
        date_created: new Date(),
        start_date: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
}
