import { Module } from '@nestjs/common';
import { EnterprisesService } from './services/enterprises.service';
import { EnterprisesController } from './controllers/enterprises.controller';

@Module({
  providers: [EnterprisesService],
  controllers: [EnterprisesController],
})
export class EnterprisesModule {}
