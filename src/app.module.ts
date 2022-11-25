import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMoudle } from './auth/auth.module';

@Module({
  imports: [AuthMoudle],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
