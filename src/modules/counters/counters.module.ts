import { Module } from '@nestjs/common';
import { CountersController } from './controllers/counters.controller';
import { CountersService } from './services/counters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from 'src/models/counters.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Counter]), AuthModule],
  controllers: [CountersController],
  providers: [CountersService],
})
export class CountersModule {}
