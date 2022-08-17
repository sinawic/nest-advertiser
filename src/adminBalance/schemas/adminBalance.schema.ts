import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminBalanceDocument = AdminBalance & Document;

@Schema()
export class AdminBalance {
  @Prop({ required: true })
  balance: number;
}

export const AdminBalanceSchema = SchemaFactory.createForClass(AdminBalance)