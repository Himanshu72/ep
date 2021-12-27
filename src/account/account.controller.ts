import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { Account } from 'src/schema/account.schema';
import { AccountService } from './account.service';
import { ExpenseDTO } from './DTO/expenses.dto';

@Controller('account')
export class AccountController {
    constructor(private accountService:AccountService ){ }
    @Post(":accID/category")
    async createCategory(@Param("accID") accID:String,@Body("category") category:String ):Promise<Account>{
            console.log(accID,category);
            return this.accountService.addCategory(accID,category);
    }
    @Delete(":accID/category")
    async deleteAccount(@Param("accID") accID:String,@Body("category") category:String ){
            return this.accountService.deleteCategory(accID,category);
    }

    @Put(":accID/category")
    async updateCategory(@Param("accID") accID:String,@Body("oldCategory") oldCategory:String,@Body("category") category:String){
        try{
        await this.accountService.deleteCategory(accID,oldCategory);
        return await this.accountService.addCategory(accID,category);
        
    }catch(e){
            throw new HttpException("Spmething Went Wrong",500);
        }
    }
    @Get("/:accID")
    async getAccount(@Param("accID") accID){
        return this.accountService.getAccount(accID);
    }

    @Post("/:accID/expenses")
    async addExpenses(@Param("accID") accID,@Body() expenseDTO:ExpenseDTO ):Promise<Account>{
        console.log(expenseDTO);
        return this.accountService.addExpenses(accID,expenseDTO);
    }

    @Delete("/:accID/expenses/:expID")
    async updateExpenses(@Param("accID") accID,@Param("expID") expID){
        return this.accountService.deleteExpenses(accID,expID);
    }
    
    @Put("/:accID/expenses/:expID")
    async deleteExpenses(@Param("accID") accID,@Param("expID") expID,@Body() ExpenseDTO){
        return await this.accountService.updateExpenses(accID,expID,ExpenseDTO);
    }
    @Get("/:accID/expenses/:expID")
    async getExpenses(@Param("accID") accID,@Param("expID") expID){
        
        return (await this.accountService.getExpenses(accID,expID)).expenese;
    }

}
