import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'dto/users.dto';
const saltRounds = 10;

@Injectable({})
export class AuthService {
  
  constructor(private prisma: PrismaService) {}

  async login(payload: User) {
   const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    const password = await bcrypt.compare(payload.password, user.password);

    if (password){
      return `logedin succfully ${user.email}`
    }
   return 'invalid user' 
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
}
 