import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "dto/users.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from "./local-auth.guard";
import { LocalStrategy } from "./local.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
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

  @UseGuards(LocalStrategy)
  @Post('login')
  login(@Request() req) {
      return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    return 'test route'
      // return this.authService.login(req.body);
  }
}

