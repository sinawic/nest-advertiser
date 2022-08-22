import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type JoinDiscountCodeDocument = JoinDiscountCode & Document;

@Schema()
export class JoinDiscountCode {
  @Prop({ required: true })
  user_unique_id: string;

  @Prop({ required: true, ref: 'campaign' })
  campaign: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'join' })
  join: mongoose.Schema.Types.ObjectId;
}

export const JoinDiscountCodeSchema = SchemaFactory.createForClass(JoinDiscountCode)
