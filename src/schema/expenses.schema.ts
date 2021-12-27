import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Expenses {

    @Prop({required:true})
    name:String
    @Prop({required:true})
    amount:Number;
    @Prop({required:true})
    type:String;
    @Prop({required:true})
    createAt:Date;
    @Prop({required:true})
    category:String; 

}

export const expensesSchema = SchemaFactory.createForClass(Expenses);