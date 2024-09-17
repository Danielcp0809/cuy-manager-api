import { Module } from '@nestjs/common';
import { EnterprisesService } from './services/enterprises.service';
import { EntriprisesController } from './controllers/entriprises.controller';

@Module({
  providers: [EnterprisesService],
  controllers: [EntriprisesController]
})
export class EnterprisesModule {}
