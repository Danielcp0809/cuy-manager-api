import { Module } from '@nestjs/common';
import { CagesController } from './controllers/cages.controller';
import { CagesService } from './services/cages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cage } from 'src/models/cages.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cage]), AuthModule],
  controllers: [CagesController],
  providers: [CagesService],
})
export class CagesModule {}
