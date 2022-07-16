import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: new Date() })
  date_created: Date;

  @Prop({ required: false, ref: 'category' })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false, ref: 'advertiser' })
  advertiser: mongoose.Schema.Types.ObjectId;

  @Prop({ default: true })
  active: boolean;
}

export const RequestSchema = SchemaFactory.createForClass(Request)

RequestSchema.index({ name: 1, advertiser: 1, category: 1 }, { unique: true });