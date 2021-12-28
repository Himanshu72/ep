import { Controller, Post,Get, Body, Param, Res } from '@nestjs/common';
import { Account } from 'src/schema/account.schema';
import { User } from 'src/schema/user.schema';
import { accountDTO, toeknUser, userDTO, userLoginDTO } from './DTO/user.dto';
import { UserService } from './user.service';
 

@Controller('user')
export class UserController {
    
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() user:userDTO):Promise<User>{
        
        return this.userService.create(user);      
    }
    @Post("/:userID/account")
    async addAccount(@Body() account:accountDTO,@Param("userID") username:String ){
    
         return this.userService.createAccount(account,username);
    }

    @Post('/login')
    auth(@Body() login:userLoginDTO) {
        return this.userService.auth(login);
    }
    @Get('/referral/:username')
    async getReferral(@Param('username') username) {
        console.log(username);
      return this.userService.getReffral(username);
    }

}
