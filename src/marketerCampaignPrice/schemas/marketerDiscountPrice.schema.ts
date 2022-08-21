import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarketerDiscountPriceDocument = MarketerDiscountPrice & Document;

@Schema()
export class MarketerDiscountPrice {
  @Prop({ required: true })
  price: number;

  @Prop({ required: true, unique: true })
  percent: number;
}

export const MarketerDiscountPriceSchema = SchemaFactory.createForClass(MarketerDiscountPrice)