import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from 'src/models/credentials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credentials])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
