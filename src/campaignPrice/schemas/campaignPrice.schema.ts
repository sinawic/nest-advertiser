import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LevelDocument = CampaignPrice & Document;

@Schema()
export class CampaignPrice {
  @Prop({ required: true })
  day_price: number;

  @Prop({ required: true })
  marketer_price: number;

  @Prop({ required: true })
  product_price: number;

  @Prop({ default: new Date() })
  date_created: Date;

  @Prop({ default: 'sms_panel' })
  campaign_type: string;

  @Prop({ required: true, ref: 'level' })
  level: mongoose.Schema.Types.ObjectId;
}

export const CampaignPriceSchema = SchemaFactory.createForClass(CampaignPrice)

CampaignPriceSchema.index({ level: 1, campaign_type: 1 }, { unique: true });