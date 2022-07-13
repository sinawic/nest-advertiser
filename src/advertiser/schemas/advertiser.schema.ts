import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AdvertiserDocument = Advertiser & Document;

@Schema()
export class Advertiser {
  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true })
  page: string;

  @Prop({ default: new Date() })
  date_created: Date;
}

export const AdvertiserSchema = SchemaFactory.createForClass(Advertiser)