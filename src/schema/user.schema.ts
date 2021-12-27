import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: String;

  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  accounts: [string];

  @Prop()
  referralBy: string;

}

export const userSchema = SchemaFactory.createForClass(User);