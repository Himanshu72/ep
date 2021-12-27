import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, accountDocument } from 'src/schema/account.schema';
import { ExpenseDTO } from './DTO/expenses.dto';

@Injectable()
export class AccountService {
    
    constructor(@InjectModel(Account.name) private accountModel: Model<accountDocument>){}
    async addCategory(accID:String,name:String){
        return this.accountModel.findOneAndUpdate({_id:accID},{$addToSet:{category:name}},{new:true});
    }
    async deleteCategory(accID:String,name:String){
        return this.accountModel.findOneAndUpdate({_id:accID},{$pull:{category:name}},{new:true})
    }
    async getAccount(accID:String){
        return this.accountModel.findOne({_id:accID});
    }
    async addExpenses(accID:String,expense:ExpenseDTO):Promise<Account>{
        return this.accountModel.findOneAndUpdate({_id:accID},{$addToSet:{expenese:expense}},{new:true});
    }
    async deleteExpenses(accID:String,expID:String):Promise<Account> {
        return this.accountModel.findOneAndUpdate({_id:accID},{$pull:{
            expenese:{_id:expID}
        } },{new:true});
    }
   async updateExpenses(accID:String,expID:String,obj:ExpenseDTO){
       console.log(accID,expID,obj);
    return this.accountModel.findByIdAndUpdate({"_id":accID,"expenese._id":expID},{
        $set:{
            "expenese.0.name":obj.name,
            "expenese.0.amount":obj.amount,
            "expenese.0.type":obj.type,
            "expenese.0.createAt":obj.createAt,
            "expenese.0.category":obj.category
        }
    },{new:true});
   } 

   async getExpenses(accID:String,expID:String){
        return this.accountModel.findOne({"__id":accID,"expenese._id":expID});
   }   
}
