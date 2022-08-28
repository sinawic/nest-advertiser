import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Join, JoinBuyLink, JoinDiscountCode, JoinShareLink } from '../schemas';
import { Advertiser } from '../../advertiser/schemas';
import { AdminBalance } from '../../adminBalance/schemas';
import { Marketer } from '../../marketer/schemas';
import { Campaign } from '../../campaign/schemas';
import { CampaignPrice } from '../../campaignPrice/schemas';
import { CampaignPercent } from '../../campaignPercent/schemas';
import { JoinBuyLinkDto, JoinShareLinkDto, JoinDiscountCodeDto } from '../dto';

@Injectable()
export class JoinCustomerService {
  constructor(
    @InjectModel(Join.name) private joinModel: Model<any>,
    @InjectModel(JoinBuyLink.name) private joinBuyLinkModel: Model<any>,
    @InjectModel(JoinShareLink.name) private joinShareLinkModel: Model<any>,
    @InjectModel(JoinDiscountCode.name) private joinDiscountCodeModel: Model<any>,
    @InjectModel(AdminBalance.name) private adminBalanceModel: Model<any>,
    @InjectModel(Advertiser.name) private advertiserModel: Model<any>,
    @InjectModel(Marketer.name) private marketerModel: Model<any>,
    @InjectModel(Campaign.name) private campaignModel: Model<any>,
    @InjectModel(CampaignPrice.name) private campaignPriceModel: Model<any>,
    @InjectModel(CampaignPercent.name) private campaignPercentModel: Model<any>,
  ) { }

  joinBuyLink = async (joinBuyLinkDto: JoinBuyLinkDto) => {
    try {
      // check if code is valid
      const join = await this.joinModel.findOne({ code: joinBuyLinkDto.code, type: 'buy_link' })
      if (!join)
        throw new HttpException({ message: 'code invalid' }, HttpStatus.BAD_REQUEST)

      if (new Date(join.start_date) < new Date() && new Date() < new Date(join.end_date)) {
        const campaign = await this.campaignModel.findOne({ _id: join.campaign })
        if (!campaign)
          throw new HttpException({ message: 'invalid join and campaign' }, HttpStatus.BAD_REQUEST)

        // update join used count
        join.used_count++
        await join.save()

        // update advertizer balance 
        await this.advertiserModel.findOneAndUpdate({ _id: join.advertiser }, { $inc: { balance: campaign.product_price } })

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

  joinShareLink = async (joinShareLinkDto: JoinShareLinkDto, ip) => {
    try {
      // check if code is valid
      const join = await this.joinModel.findOne({ code: joinShareLinkDto.code, type: 'share_link' })
      if (!join)
        throw new HttpException({ message: 'code invalid' }, HttpStatus.BAD_REQUEST)

      if (new Date(join.start_date) < new Date() && new Date() < new Date(join.end_date)) {
        const campaign = await this.campaignModel.findOne({ _id: join.campaign })
        if (!campaign)
          throw new HttpException({ message: 'invalid join and campaign' }, HttpStatus.BAD_REQUEST)

        if ((campaign.click_count || 0) <= (campaign.clicked_count || 0))
          throw new HttpException({ message: 'campaign link limit' }, HttpStatus.BAD_REQUEST)

        const req = await this.joinShareLinkModel.findOne({ ip, join, date: { $gt: new Date(new Date().getTime() - 60 * 60 * 24 * 1000) } })
        if (req) {
          const prices = await this.campaignPriceModel.findOne({ campaign_type: 'share_link', level: join.level })
          const percents = await this.campaignPercentModel.findOne({ campaign_type: 'share_link', level: join.level })

          // update join used count
          join.used_count++
          await join.save()

          campaign.clicked_count = (campaign.clicked_count || 0) + 1
          await campaign.save()

          // increase admin and marketer balance
          await this.adminBalanceModel.updateOne({}, { $inc: { balance: prices.link_price - (percents.link_marketer_percent * prices.link_price / 100) } })
          await this.marketerModel.updateOne({ _id: join.marketer }, { $inc: { balance: percents.link_marketer_percent * prices.link_price / 100 } })

          return { message: 'success' }
        }
        throw new HttpException({ message: 'visit expired, revisit the link' }, HttpStatus.BAD_REQUEST)
      } else
        throw new HttpException({ message: 'code expired' }, HttpStatus.BAD_REQUEST)

    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  preJoinShareLink = async (code, ip) => {
    try {
      // check if code is valid
      const join = await this.joinModel.findOne({ code: code, type: 'share_link' })
      if (!join)
        throw new HttpException({ message: 'code invalid' }, HttpStatus.BAD_REQUEST)

      if (new Date(join.start_date) < new Date() && new Date() < new Date(join.end_date)) {
        const req = await this.joinShareLinkModel.findOne({ ip, join })
        if (req) {
          req.date = new Date()
          await req.save()
        } else {
          await new this.joinShareLinkModel({ date: new Date(), ip, join, campaign: join.campaign }).save()
        }

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
