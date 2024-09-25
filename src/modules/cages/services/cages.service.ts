import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Cage } from 'src/models/cages.entity';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import { CreateCageDto, UpdateCageDto } from 'src/validators/cages.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CagesService {
  constructor(
    @InjectRepository(Cage)
    private cagesRepository: Repository<Cage>,
  ) {}

  async createCage(body: CreateCageDto, req: IRequest) {
    try {
      const cage = await this.cagesRepository.findOneBy({
        code: body.code,
        enterprise_id: req.user.enterprise_id,
      });
      if (cage) {
        throw new ConflictException('Cage already exists');
      }
      const newCage = this.cagesRepository.create(body);
      newCage.enterprise_id = req.user.enterprise_id;
      await this.cagesRepository.save(newCage);
      return newCage;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateCage(id: string, body: UpdateCageDto, req: IRequest) {
    try {
      if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
      const cage = await this.cagesRepository.findOneBy({
        id,
        enterprise_id: req.user.enterprise_id,
      });
      if (!cage) throw new NotFoundException('Cage not found');
      this.cagesRepository.merge(cage, body);
      return await this.cagesRepository.save(cage);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async getAllCages(req: IRequest) {
    try {
      return await this.cagesRepository.find({
        where: { enterprise_id: req.user.enterprise_id },
        order: { code: 'ASC' },
        relations: ['counters'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCageById(id: string) {
    try {
      if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
      const cage = await this.cagesRepository.findOne({
        where: { id },
        relations: ['counters', 'counters.category'],
      });
      if (!cage) throw new NotFoundException('Cage not found');
      return cage;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
