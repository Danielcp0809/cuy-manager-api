import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/models/categories.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
