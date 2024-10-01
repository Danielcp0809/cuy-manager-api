import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cage } from 'src/models/cages.entity';
import { Category } from 'src/models/categories.entity';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Cage)
    private cageRepository: Repository<Cage>,
  ) {}

  async getCategoriesChartData(req: IRequest) {
    try {
      const categories = await this.categoryRepository.find({
        where: { enterprise_id: req.user.enterprise_id },
        order: { name: 'ASC' },
        relations: ['counters'],
      });
      return categories.map((category) => {
        const categoryTotalCounters = category.counters.reduce(
          (acc, counter) => acc + counter.amount,
          0,
        );
        return {
          color: category.color,
          label: category.name,
          total: categoryTotalCounters,
        };
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCagesChartData(req: IRequest) {
    try {
      const categories = await this.categoryRepository.find({
        where: { enterprise_id: req.user.enterprise_id },
        order: { name: 'ASC' },
        relations: ['counters'],
      });
      const cages = await this.cageRepository.find({
        where: { enterprise_id: req.user.enterprise_id },
        order: { code: 'ASC' },
      });
      const datasets = categories.map((category) => {
        const data = cages.map((cage) => {
          const cageCounter = category.counters.find(
            (counter) => counter.cage_id === cage.id,
          );
          return cageCounter ? cageCounter.amount : 0;
        });
        return {
          name: category.name,
          data: data,
          color: category.color,
        };
      });
      return {
        labels: cages.map((cage) => cage.code),
        categories: datasets,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getStatsData(req: IRequest) {
    try {
      const cages = await this.cageRepository.find({
        where: { enterprise_id: req.user.enterprise_id },
        relations: ['counters', 'counters.category'],
      });
      const categories = await this.categoryRepository.find({
        where: { enterprise_id: req.user.enterprise_id },
      });
      const total = cages.reduce((acc, cage) => {
        return (
          acc + cage.counters.reduce((acc, counter) => acc + counter.amount, 0)
        );
      }, 0);
      const estimatedPrice = cages.reduce((acc, cage) => {
        const totalCagePrice = cage.counters.reduce((acc, counter) => {
          return acc + counter.amount * counter.category.price;
        }, 0);
        return acc + totalCagePrice;
      }, 0);

      return {
        total: total,
        cages: cages.length,
        categories: categories.length,
        price: estimatedPrice,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
