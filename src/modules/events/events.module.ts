import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breeding } from 'src/models/breedings.entity';
import { AuthModule } from '../auth/auth.module';
import { Cage } from 'src/models/cages.entity';
import { Counter } from 'src/models/counters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breeding, Cage, Counter]), AuthModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
