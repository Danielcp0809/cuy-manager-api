import { Module } from '@nestjs/common';
import { EnterprisesService } from './services/enterprises.service';
import { EnterprisesController } from './controllers/enterprises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprises } from 'src/models/enterprises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprises])],
  providers: [EnterprisesService],
  controllers: [EnterprisesController],
})
export class EnterprisesModule {}
