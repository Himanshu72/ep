import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Expenses, expensesSchema } from './expenses.schema';

export type accountDocument = Account & Document;

@Schema()
export class Account {

  @Prop({required:true})
  account:String
  @Prop({type:[expensesSchema]})
  expenese: [Expenses];

  @Prop()
  category:[String];

}

export const accountSchema = SchemaFactory.createForClass(Account);