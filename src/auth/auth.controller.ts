import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {  
  constructor(private authService : AuthService) {}

  @Post('signup')
  signUp(@Req() req : Request) {
    return  this.authService.createUser(req.body).then(data => {
        return data
    }).catch(err => {
        return err
    });
  }

  @Post('sinin')
  signIn() {
    return 'hello sinIn';
  }
}


