import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, accountSchema } from 'src/schema/account.schema';
import { AuthMiddleware } from 'src/auth.middleware';

@Module({
  imports:[MongooseModule.forFeature([{ name: Account.name, schema: accountSchema }]),],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(AccountController);
  }
}
