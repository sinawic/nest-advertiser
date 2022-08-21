import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type JoinBuyLinkDocument = JoinBuyLink & Document;

@Schema()
export class JoinBuyLink {
  @Prop({ required: true })
  postal_code: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ default: 0 })
  count: number;

  @Prop({ required: true, ref: 'campaign' })
  campaign: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'join' })
  join: mongoose.Schema.Types.ObjectId;
}

export const JoinBuyLinkSchema = SchemaFactory.createForClass(JoinBuyLink)
