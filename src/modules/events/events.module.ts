import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breeding } from 'src/models/breedings.entity';
import { AuthModule } from '../auth/auth.module';
import { Cage } from 'src/models/cages.entity';
import { Counter } from 'src/models/counters.entity';
import { Purchase } from 'src/models/purchases.entity';
import { Sale } from 'src/models/sales.entity';
import { Fatten } from 'src/models/fattens.entity';
import { Dead } from 'src/models/deads.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Breeding,
      Purchase,
      Sale,
      Cage,
      Counter,
      Fatten,
      Dead,
    ]),
    AuthModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
