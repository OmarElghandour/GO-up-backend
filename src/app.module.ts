import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMoudle } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { PrismaService } from './prismaService/prisma.service';

@Module({
  imports: [AuthMoudle, PassportModule ],
  controllers: [AppController],
  providers: [AppService,AuthService, PrismaService, JwtService],
})
export class AppModule {}
