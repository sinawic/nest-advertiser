import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdvertiserDocument = Advertiser & Document;

@Schema()
export class Advertiser {
  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ required: true })
  page: string;

  @Prop({ required: true })
  page_type: string;

  @Prop({ default: new Date() })
  date_created: Date;
}

export const AdvertiserSchema = SchemaFactory.createForClass(Advertiser)