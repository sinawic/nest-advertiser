import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
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

export const ProductSchema = SchemaFactory.createForClass(Product)

ProductSchema.index({ name: 1, advertiser: 1, category: 1 }, { unique: true });