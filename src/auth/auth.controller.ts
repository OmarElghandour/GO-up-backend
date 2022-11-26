import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "dto/users.dto";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {  
  constructor(private authService : AuthService) {}

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return  this.authService.createUser(user).then(data => {
        return data
    }).catch(err => {
        return err
    });
  }

  @Post('signin')
  signIn(@Body() user) {
    return  this.authService.login(user).then(data => {
        return data
    }).catch(err => {
        return err
    });
  }
}