import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Enterprise } from 'src/models/enterprises.entity';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { CreateEnterpriseDto } from 'src/validators/enterprises.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectRepository(Enterprise)
    private enterprisesRepository: Repository<Enterprise>,
    private authService: AuthService,
  ) {}
  async createEnterprises(body: CreateEnterpriseDto) {
    try {
      const enterprise = await this.enterprisesRepository.findOneBy({
        name: body.name,
      });
      if (enterprise) {
        throw new BadRequestException('Enterprise already exists');
      }
      const newEnterprise = this.enterprisesRepository.create(body);
      await this.enterprisesRepository.save(newEnterprise);
      const { password } = await this.authService.createCredentials(
        enterprise,
        body.email,
      );
      return { enterprise: newEnterprise, password };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateEnterprise(id: string, body: CreateEnterpriseDto) {
    try {
      if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
      const enterprise = await this.enterprisesRepository.findOneBy({ id });
      if (!enterprise) throw new BadRequestException('Enterprise not found');
      this.enterprisesRepository.merge(enterprise, body);
      return await this.enterprisesRepository.save(enterprise);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
