import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Counter } from 'src/models/counters.entity';
import {
  CreateCounterDto,
  UpdateCounterDto,
} from 'src/validators/counters.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CountersService {
  constructor(
    @InjectRepository(Counter)
    private countersRepository: Repository<Counter>,
  ) {}

  async createCounter(body: CreateCounterDto) {
    try {
      const counter = await this.countersRepository.findOne({
        where: { category_id: body.category_id, cage_id: body.cage_id },
      });
      if (counter)
        throw new ConflictException(
          'A counter with the specified category already exists for this cage',
        );
      const newCounter = this.countersRepository.create(body);
      await this.countersRepository.save(newCounter);
      return newCounter;
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(
          'Error creating counter. Category or cage not exist.',
        );
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateCounter(id: string, body: UpdateCounterDto) {
    try {
      if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
      const counter = await this.countersRepository.findOne({ where: { id } });
      if (!counter) throw new NotFoundException('Counter not found');

      const newCounter = await this.countersRepository.findOne({
        where: {
          category_id: body.category_id ?? counter.category_id,
          cage_id: body.cage_id ?? counter.cage_id,
        },
      });
      if (newCounter && newCounter.id !== counter.id)
        throw new ConflictException(
          'A counter with the specified category already exists for this cage',
        );
      this.countersRepository.merge(counter, body);
      return await this.countersRepository.save(counter);
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(
          'Error updating counter. Category or cage not exist.',
        );
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async deleteCounter(id: string) {
    try {
      const counter = await this.countersRepository.findOne({ where: { id } });
      if (!counter) throw new BadRequestException('Counter not found');
      await this.countersRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
