import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type JoinDocument = Join & Document;

@Schema()
export class Join {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  code_price: number;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ default: 0 })
  used_count: number;

  @Prop({ default: new Date() })
  date_created: Date;

  @Prop({ default: new Date() })
  start_date: Date;

  @Prop({ default: new Date() })
  end_date: Date;

  @Prop({ required: true, ref: 'level' })
  level: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'campaign' })
  campaign: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'marketer' })
  marketer: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 1 })
  discount_usable_count: number;

  @Prop({ default: 1 })
  discount_percent: number;
}

export const JoinSchema = SchemaFactory.createForClass(Join)

JoinSchema.index({ marketer: 1, campaign: 1 }, { unique: true });