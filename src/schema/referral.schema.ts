import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type referralDocument = Referral & Document;

@Schema()

export class Referral {
  @Prop()
  _id: string;
  @Prop()
  data: [string];
}

export const referralSchema = SchemaFactory.createForClass(Referral);