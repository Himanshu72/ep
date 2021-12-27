import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from "jsonwebtoken";;
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    
    try{
      const token=req.headers.authorization;
     // console.log(token); 
      if(!token)
      throw new HttpException("Please Provide Token",400);
      let obj=jwt.verify(token, 'ep')
      
      next();
  }catch(e){
      throw new HttpException("Invalid Token",400);
    }
    
  }
}
