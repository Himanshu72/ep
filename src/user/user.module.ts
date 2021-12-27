import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/user.schema';
import { Account, accountSchema } from 'src/schema/account.schema';
import { Referral, referralSchema } from 'src/schema/referral.schema';
import { AuthMiddleware } from 'src/auth.middleware';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: accountSchema }]),
    MongooseModule.forFeature([{ name: Referral.name, schema: referralSchema }])
],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
    { path: 'user/login', method: RequestMethod.GET },
    { path: 'user', method: RequestMethod.POST }
  )
  .forRoutes(UserController);
    }
  
}
