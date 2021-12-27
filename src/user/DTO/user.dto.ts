export class userDTO {
  _id: String;
  username:String;
  name: String;
  password: String;
  language: String;
  referralBy:String;
  accounts:[String];
}

export class userLoginDTO{
  username:String;
  password:String;
}

export class toeknUser{
  user:userDTO;
  token:String
  constructor(user,token){
    this.user=user;
    this.token=token;
  }
}
class Expense{
  amount:Number;
  type:String;
  createAt:Date;
  category:String;  
}
export class accountDTO{
  
  _id:String;
  expenese: [Expense];
  category:[String];

}

