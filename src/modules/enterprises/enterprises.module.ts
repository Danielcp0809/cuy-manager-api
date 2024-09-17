import { Module } from '@nestjs/common';
import { EnterprisesService } from './services/enterprises.service';
import { EnterprisesController } from './controllers/enterprises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from 'src/models/enterprises.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise]), AuthModule],
  providers: [EnterprisesService],
  controllers: [EnterprisesController],
})
export class EnterprisesModule {}
