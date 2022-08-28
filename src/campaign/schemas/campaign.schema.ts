import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CampaignPicDocument } from '.';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  // campaign general fields
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: {} })
  pic: CampaignPicDocument;
  // 

  // link fields
  @Prop({})
  link: string;
  // 

  // product fields
  @Prop({})
  product_title: string;

  @Prop({})
  product_description: string;

  @Prop({})
  product_price: number;

  @Prop({ type: {} })
  product_pic: CampaignPicDocument;
  // 

  // share link fields
  @Prop({})
  click_count: number;

  @Prop({})
  clicked_count: number;
  // 

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  objection: string;

  @Prop({ required: false })
  objection_response: string;

  @Prop({ default: null }) // true: admin approved, false: admin rejected
  objection_status: boolean;

  @Prop({ default: false })
  admin_verified: boolean;

  @Prop({ default: 'process' }) // process, done, hold
  state: string;

  @Prop({ required: true })
  final_price: number;

  @Prop({ required: true })
  product_count: number;

  @Prop({ required: true })
  marketer_count: number;

  @Prop({ default: 0 })
  marketers_joined: number;

  @Prop({ default: new Date() })
  date_created: Date;

  @Prop({ default: new Date() })
  start_date: Date;

  @Prop({ default: new Date() })
  end_date: Date;

  @Prop({ default: null })
  discount_usable_count: number;

  @Prop({ default: null })
  discount_percent: number;

  @Prop({ required: true, ref: 'level' })
  level: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'advertiser' })
  advertiser: mongoose.Schema.Types.ObjectId;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign)