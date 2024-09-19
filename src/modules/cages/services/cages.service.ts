import { BadRequestException, Injectable } from '@nestjs/common';
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
        throw new BadRequestException('Cage already exists');
      }
      const newCage = this.cagesRepository.create(body);
      newCage.enterprise_id = req.user.enterprise_id;
      await this.cagesRepository.save(newCage);
      return newCage;
    } catch (error) {
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
      if (!cage) throw new BadRequestException('Cage not found');
      this.cagesRepository.merge(cage, body);
      return await this.cagesRepository.save(cage);
    } catch (error) {
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
}
