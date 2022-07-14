import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ default: new Date() })
  date_created: Date;

  @Prop({ required: false, ref: 'category' })
  parent: mongoose.Schema.Types.ObjectId;

  @Prop({ default: true })
  active: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category)