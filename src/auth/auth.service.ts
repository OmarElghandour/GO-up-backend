import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
const saltRounds = 10;

@Injectable({})
export class AuthService {
  
  constructor(
    private prisma: PrismaService,
    private jwtService : JwtService
    ) {}

  // async login(payload: User) {
  //  const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: payload.email,
  //     },
  //   });
  //   const password = await bcrypt.compare(payload.password, user.password);

  //   if (password){
  //     console.log('xxxxxxxxxxxxxx')
  //     console.log(this.jwtService.sign(payload));
  //     return { access_token: this.jwtService.sign(payload)};
  //   }
  //  return 'faild to found user'
  // }


  async validateUser(email , password): Promise<any> {

    console.log('xxxxxxxxxxxxxxxxxx');
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }


  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    return this.prisma.user.create({
      data : {
        email: data.email,
        password: hashedPassword,    
        hash : data.hash
      }
    });
  }

  async login(user: any) {

    await this.validateUser(user.username, user.password);

    const logedInUser = await this.prisma.user.findUnique({
      where: {
        email: user.username,
      },
    });

    console.log({email : logedInUser?.email});

    const payload = {userId: user.id, username: user.username} ;

    
    // console.log(user);

    return {
      access_token: this.jwtService.sign(payload, {secret : jwtConstants.secret})
    };
  }
}
 