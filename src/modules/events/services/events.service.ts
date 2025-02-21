import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breeding } from 'src/models/breedings.entity';
import { Cage } from 'src/models/cages.entity';
import { Counter } from 'src/models/counters.entity';
import { Dead } from 'src/models/deads.entity';
import { Fatten } from 'src/models/fattens.entity';
import { Health } from 'src/models/healths.entity';
import { Purchase } from 'src/models/purchases.entity';
import { Sale } from 'src/models/sales.entity';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import { CreateBreedingDto } from 'src/validators/breedings.dto';
import { CreateDeadDto } from 'src/validators/deads.dto';
import { CreateFattenDto } from 'src/validators/fattens.dto';
import { CreateHealthDto } from 'src/validators/healths.dto';
import { CreatePurchaseDto } from 'src/validators/purchases.dto';
import { CreateSaleDto } from 'src/validators/sales.dto';
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

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
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Fatten)
    private fattenRepository: Repository<Fatten>,
    @InjectRepository(Dead)
    private deadRepository: Repository<Dead>,
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
  ) {}

  // BREEDINGS
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
      if (!body.date || body.date === 0) body.date = Date.now();
      const newBreeding = this.breedingRepository.create(body);
      newBreeding.enterprise_id = req.user.enterprise_id;
      await this.breedingRepository.save(newBreeding);
      return newBreeding;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getBreedingEvents(filters: any, req: IRequest) {
    const {
      cageID,
      maleCageID,
      maleCategoryID,
      femaleCageID,
      femaleCategoryID,
      minDate,
      maxDate,
      page,
      limit,
      sortBy,
      sortOrder,
    } = filters;

    const options: FindManyOptions<Breeding> = {
      where: { enterprise_id: req.user.enterprise_id },
      relations: [
        'cage',
        'male_cage',
        'female_cage',
        'male_category',
        'female_category',
      ],
      select: {
        cage: {
          id: true,
          code: true,
        },
        male_cage: {
          id: true,
          code: true,
        },
        male_category: {
          id: true,
          name: true,
        },
        female_cage: {
          id: true,
          code: true,
        },
        female_category: {
          id: true,
          name: true,
        },
        id: true,
        male_quantity: true,
        female_quantity: true,
        months_duration: true,
        description: true,
        date: true,
      },
      order: { [sortBy]: sortOrder.toUpperCase() },
      take: limit,
      skip: (page - 1) * limit,
    };
    if (cageID) options.where['cage_id'] = cageID;
    if (maleCageID) options.where['male_cage_id'] = maleCageID;
    if (maleCategoryID) options.where['male_category_id'] = maleCategoryID;
    if (femaleCageID) options.where['female_cage_id'] = femaleCageID;
    if (femaleCategoryID)
      options.where['female_category_id'] = femaleCategoryID;
    if (minDate && maxDate) {
      options.where['date'] = Between(minDate, maxDate);
    } else if (minDate) {
      options.where['date'] = MoreThanOrEqual(minDate);
    } else if (maxDate) {
      options.where['date'] = LessThanOrEqual(maxDate);
    }
    try {
      return await this.breedingRepository.find(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // PURCHASES
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
      if (!body.date || body.date === 0) body.date = Date.now();
      const newPurchase = this.purchaseRepository.create(body);
      newPurchase.enterprise_id = req.user.enterprise_id;
      await this.purchaseRepository.save(newPurchase);
      return newPurchase;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getPurchaseEvents(filters: any, req: IRequest) {
    const {
      categoryID,
      cageID,
      quantity,
      minDate,
      maxDate,
      page,
      limit,
      sortBy,
      sortOrder,
    } = filters;

    const options: FindManyOptions<Purchase> = {
      where: { enterprise_id: req.user.enterprise_id },
      relations: ['category', 'cage'],
      select: {
        cage: {
          id: true,
          code: true,
        },
        category: {
          id: true,
          name: true,
        },
        id: true,
        quantity: true,
        description: true,
        weight: true,
        total_price: true,
        date: true,
      },
      order: { [sortBy]: sortOrder.toUpperCase() },
      take: limit,
      skip: (page - 1) * limit,
    };
    if (categoryID) options.where['category_id'] = categoryID;
    if (cageID) options.where['cage_id'] = cageID;
    if (quantity) options.where['quantity'] = quantity;
    if (minDate && maxDate) {
      options.where['date'] = Between(minDate, maxDate);
    } else if (minDate) {
      options.where['date'] = MoreThanOrEqual(minDate);
    } else if (maxDate) {
      options.where['date'] = LessThanOrEqual(maxDate);
    }
    try {
      return await this.purchaseRepository.find(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // SALES
  async createSaleEvent(body: CreateSaleDto, req: IRequest) {
    // Update cage counters
    const cage = await this.cageRepository.findOne({
      where: { id: body.cage_id },
      relations: ['counters'],
    });
    if (!cage) throw new NotFoundException('Cage not found');
    const cageCounter = cage.counters.find(
      (counter) => counter.category_id === body.category_id,
    );
    if (!cageCounter) throw new NotFoundException('Counter not found');

    if (cageCounter.amount < body.quantity)
      throw new BadRequestException('Not enough animals in the cage');

    try {
      cageCounter.amount -= body.quantity;
      await this.cageRepository.save(cage);
      // create sale event
      if (!body.date || body.date === 0) body.date = Date.now();
      const newSale = this.saleRepository.create(body);
      newSale.enterprise_id = req.user.enterprise_id;
      await this.saleRepository.save(newSale);
      return newSale;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getSaleEvents(filters: any, req: IRequest) {
    const {
      categoryID,
      cageID,
      quantity,
      minDate,
      maxDate,
      page,
      limit,
      sortBy,
      sortOrder,
    } = filters;
    const options: FindManyOptions<Sale> = {
      where: { enterprise_id: req.user.enterprise_id },
      relations: ['category', 'cage'],
      select: {
        cage: {
          id: true,
          code: true,
        },
        category: {
          id: true,
          name: true,
        },
        id: true,
        quantity: true,
        description: true,
        unit_price: true,
        unit_weight: true,
        date: true,
      },
      order: { [sortBy]: sortOrder.toUpperCase() },
      take: limit,
      skip: (page - 1) * limit,
    };
    if (categoryID) options.where['category_id'] = categoryID;
    if (cageID) options.where['cage_id'] = cageID;
    if (quantity) options.where['quantity'] = quantity;
    if (minDate && maxDate) {
      options.where['date'] = Between(minDate, maxDate);
    } else if (minDate) {
      options.where['date'] = MoreThanOrEqual(minDate);
    } else if (maxDate) {
      options.where['date'] = LessThanOrEqual(maxDate);
    }
    try {
      return await this.saleRepository.find(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createFattenEvent(body: CreateFattenDto, req: IRequest) {
    // Obtener las jaulas de origen y destino
    const originCage = await this.cageRepository.findOne({
      where: { id: body.origin_cage_id },
      relations: ['counters'],
    });
    const destinyCage = await this.cageRepository.findOne({
      where: { id: body.destiny_cage_id },
      relations: ['counters'],
    });

    if (!originCage || !destinyCage) {
      throw new NotFoundException('Either origin or destiny cage not found');
    }

    try {
      // Verify if the origin and destiny cages are the same
      if (body.origin_cage_id === body.destiny_cage_id) {
        const cageCounter = originCage.counters.find(
          (counter) => counter.category_id === body.category_id,
        );

        if (!cageCounter) {
          throw new NotFoundException('Counter not found in the cage');
        }

        if (cageCounter.amount < body.quantity) {
          throw new BadRequestException('Not enough animals in the cage');
        }

        // Create fattening event
        if (!body.date || body.date === 0) {
          body.date = Math.floor(Date.now() / 1000); // Establecer fecha en formato epoch (segundos)
        }

        const newFatten = this.fattenRepository.create(body);
        newFatten.enterprise_id = req.user.enterprise_id;
        await this.fattenRepository.save(newFatten);

        return newFatten;
      }

      // Actualizar contadores de la jaula de origen
      const originCageCounterIndex = originCage.counters.findIndex(
        (counter) => counter.category_id === body.category_id,
      );

      if (originCageCounterIndex === -1) {
        throw new NotFoundException('Counter not found in origin cage');
      }

      if (originCage.counters[originCageCounterIndex].amount < body.quantity) {
        throw new BadRequestException('Not enough animals in the origin cage');
      }

      originCage.counters[originCageCounterIndex].amount -= body.quantity;
      await this.cageRepository.save(originCage);

      // Actualizar contadores de la jaula de destino
      const destinyCageCounterIndex = destinyCage.counters.findIndex(
        (counter) => counter.category_id === body.category_id,
      );

      if (destinyCageCounterIndex === -1) {
        const newCounter = this.counterRepository.create({
          cage_id: body.destiny_cage_id,
          category_id: body.category_id,
          amount: body.quantity,
        });
        await this.counterRepository.save(newCounter);
      } else {
        destinyCage.counters[destinyCageCounterIndex].amount += body.quantity;
        await this.cageRepository.save(destinyCage);
      }

      // Crear evento de engorde
      if (!body.date || body.date === 0) body.date = Date.now();

      const newFatten = this.fattenRepository.create(body);
      newFatten.enterprise_id = req.user.enterprise_id;
      await this.fattenRepository.save(newFatten);

      return newFatten;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createDeadEvent(body: CreateDeadDto, req: IRequest) {
    // Update cage counters
    const cage = await this.cageRepository.findOne({
      where: { id: body.cage_id },
      relations: ['counters'],
    });
    if (!cage) throw new NotFoundException('Cage not found');
    const cageCounterIndex = cage.counters.findIndex(
      (counter) => counter.category_id === body.category_id,
    );
    if (cageCounterIndex === -1)
      throw new NotFoundException('Counter not found');

    if (cage.counters[cageCounterIndex].amount < body.quantity)
      throw new BadRequestException('Not enough animals in the cage');

    try {
      cage.counters[cageCounterIndex].amount -= body.quantity;
      await this.cageRepository.save(cage);
      // create dead event
      if (!body.date || body.date === 0) body.date = Date.now();
      const newDead = this.deadRepository.create(body);
      newDead.enterprise_id = req.user.enterprise_id;
      await this.deadRepository.save(newDead);
      return newDead;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createHealthEvent(body: CreateHealthDto, req: IRequest) {
    const cage = await this.cageRepository.findOne({
      where: { id: body.cage_id },
      relations: ['counters'],
    });
    if (!cage) throw new NotFoundException('Cage not found');
    const cageCounter = cage.counters.find(
      (counter) => counter.category_id === body.category_id,
    );
    if (!cageCounter) throw new NotFoundException('Counter not found');

    if (cageCounter.amount < body.quantity)
      throw new BadRequestException('Not enough animals in the cage');

    try {
      // create health event
      if (!body.date || body.date === 0) body.date = Date.now();
      const newHealth = this.healthRepository.create(body);
      newHealth.enterprise_id = req.user.enterprise_id;
      await this.healthRepository.save(newHealth);
      return newHealth;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
