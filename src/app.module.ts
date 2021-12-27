import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';



@Module({
  imports: [UserModule
    ,MongooseModule.forRoot('mongodb+srv://himanshu:joshi%40123@cluster0-edkju.mongodb.net/ep?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true')
  , AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
