import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User, userDocument } from 'src/schema/user.schema';
import { toeknUser, userDTO, userLoginDTO } from './DTO/user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Account, accountDocument } from 'src/schema/account.schema';
import { Referral, referralDocument } from 'src/schema/referral.schema';
import * as jwt from 'jsonwebtoken';

export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<userDocument>,
                @InjectModel(Account.name) private accountModel: Model<accountDocument>,
                @InjectModel(Referral.name) private referralModel: Model<referralDocument>) {}

    async addReferral(referralBy,username){
       return this.referralModel.updateOne({_id:referralBy},{$addToSet:{data:username}}); 
    }            
    async create(user:userDTO):Promise<User>{
        user._id=user.username;
        const createdUser = new this.userModel(user);
        let refobj={_id:user.username};
        const createdReferral= new this.referralModel(refobj)
        let promise=[];
        promise.push(createdUser.save());
        promise.push(createdReferral.save());
        if(user.referralBy)
            promise.push(this.addReferral(user.referralBy,user.username))
            
        
        try{
        let results= await Promise.all(promise)  
         return results[0];   
    }catch(e){
            throw new HttpException("Something went wrong",500)
        }
        
    }

    async createAccount(obj,username){
        try{
               let createdAccount=new this.accountModel(obj);
                let account=await createdAccount.save();
               await this.userModel.updateOne({_id:username},{$addToSet:{accounts:account._id}}); 
               
              return account;
        }catch(e){
            console.log(e);
            throw new HttpException("Something went wrong",500)
        }  
    }

async auth(userLoginDTO:userLoginDTO):Promise<toeknUser>{
        const userData=await this.userModel.findOne({_id:userLoginDTO.username});
        if(userData && userData.password==userLoginDTO.password){
        
            const token=jwt.sign({
                data: userData
              }, 'ep', { expiresIn: '1d' });

              return new toeknUser(userData,token);

        }else{
            throw new HttpException("Unauthorized",400);
        }
    }
    async getReffral(username){
        return this.referralModel.findOne({_id:username})
    }
}
