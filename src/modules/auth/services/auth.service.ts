import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/models/credentials.entity';
import { Enterprise } from 'src/models/enterprises.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credentials)
    private credentialsRepository: Repository<Credentials>,
  ) {}

  async createCredentials(enterprise: Enterprise, email: string) {
    const password = Math.random().toString(36).slice(2, 12);
    const encryptedPassword = await this.encryptPassword(password);
    const newCredentials = new Credentials();
    newCredentials.username = email;
    newCredentials.password = encryptedPassword;
    newCredentials.enterprise = enterprise;
    return {
      credentials: await this.credentialsRepository.save(newCredentials),
      password,
    };
  }

  async encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
