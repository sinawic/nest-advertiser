import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LevelDocument = CampaignPercent & Document;

@Schema()
export class CampaignPercent {

  @Prop({ required: true })
  marketer_percent: number;

  @Prop({ required: true })
  p_marketer_percent: number;

  @Prop({ required: true })
  admin_percent: number;

  @Prop({ required: true })
  advertizer_percent: number;

  @Prop({ default: new Date() })
  date_created: Date;

  @Prop({ default: 'sms_panel' })
  campaign_type: string;

  @Prop({ required: true, ref: 'level' })
  level: mongoose.Schema.Types.ObjectId;
}

export const CampaignPercentSchema = SchemaFactory.createForClass(CampaignPercent)

CampaignPercentSchema.index({ level: 1, campaign_type: 1 }, { unique: true });