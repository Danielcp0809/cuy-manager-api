import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/models/categories.entity';
import { AuthModule } from '../auth/auth.module';
import { Cage } from 'src/models/cages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Cage]), AuthModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
