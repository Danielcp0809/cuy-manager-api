import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breeding } from 'src/models/breedings.entity';
import { Cage } from 'src/models/cages.entity';
import { Counter } from 'src/models/counters.entity';
import { Purchase } from 'src/models/purchases.entity';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import { CreateBreedingDto } from 'src/validators/breedings.dto';
import { CreatePurchaseDto } from 'src/validators/purchases.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Breeding)
    private breedingRepository: Repository<Breeding>,
    @InjectRepository(Cage)
    private cageRepository: Repository<Cage>,
    @InjectRepository(Counter)
    private counterRepository: Repository<Counter>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async createBreedingEvent(body: CreateBreedingDto, req: IRequest) {
    try {
      // Helper function to update cage counter
      const updateCageCounter = async (
        cageId: string,
        categoryId: string,
        quantity: number,
        increase: boolean,
      ) => {
        const cage = await this.cageRepository.findOne({
          where: { id: cageId },
          relations: ['counters'],
        });

        const counterIndex = cage.counters.findIndex(
          (counter) => counter.category_id === categoryId,
        );

        if (counterIndex === -1 && increase) {
          // Create new counter if it doesn't exist
          const newCounter = this.counterRepository.create({
            cage_id: cageId,
            category_id: categoryId,
            amount: quantity,
          });
          await this.counterRepository.save(newCounter);
        } else {
          // Update existing counter
          cage.counters[counterIndex].amount += increase ? quantity : -quantity;
          await this.cageRepository.save(cage);
        }
      };

      // Update male cage counter if different from final cage
      if (body.male_cage_id !== body.cage_id) {
        await updateCageCounter(
          body.male_cage_id,
          body.male_category_id,
          body.male_quantity,
          false,
        );
      }

      // Update female cage counter if different from final cage
      if (body.female_cage_id !== body.cage_id) {
        await updateCageCounter(
          body.female_cage_id,
          body.female_category_id,
          body.female_quantity,
          false,
        );
      }

      // Update final cage counters
      if (body.male_cage_id !== body.cage_id) {
        await updateCageCounter(
          body.cage_id,
          body.male_category_id,
          body.male_quantity,
          true,
        );
      }

      if (body.female_cage_id !== body.cage_id) {
        await updateCageCounter(
          body.cage_id,
          body.female_category_id,
          body.female_quantity,
          true,
        );
      }

      // Create breeding event
      const newBreeding = this.breedingRepository.create(body);
      newBreeding.enterprise_id = req.user.enterprise_id;
      await this.breedingRepository.save(newBreeding);
      return newBreeding;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createPurchaseEvent(body: CreatePurchaseDto, req: IRequest) {
    // Update cage counters
    const cage = await this.cageRepository.findOne({
      where: { id: body.cage_id },
      relations: ['counters'],
    });
    if (!cage) {
      throw new InternalServerErrorException('Cage not found');
    }

    try {
      const cageCounter = cage.counters.find(
        (counter) => counter.category_id === body.category_id,
      );
      if (!cageCounter) {
        // create counter
        const newCounter = this.counterRepository.create({
          cage_id: body.cage_id,
          category_id: body.category_id,
          amount: body.quantity,
        });
        await this.counterRepository.save(newCounter);
      } else {
        cageCounter.amount += body.quantity;
        await this.cageRepository.save(cage);
      }
      // create purchase event
      const newPurchase = this.purchaseRepository.create(body);
      newPurchase.enterprise_id = req.user.enterprise_id;
      await this.purchaseRepository.save(newPurchase);
      return newPurchase;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
