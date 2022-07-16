import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from '.';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop({ required: true })
  price: number;

  @Prop({ default: new Date() })
  date_created: Date;

  @Prop({ default: false })
  admin_verified: boolean;

  @Prop({ type: {} })
  screenshot: Attachment;

  @Prop({ required: false, ref: 'product' })
  product: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false, ref: 'user' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false, ref: 'advertiser' })
  advertiser: mongoose.Schema.Types.ObjectId;
}

export const RequestSchema = SchemaFactory.createForClass(Request)