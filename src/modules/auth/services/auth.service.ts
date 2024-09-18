import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/models/credentials.entity';
import { Enterprise } from 'src/models/enterprises.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { RefreshTokenDto } from 'src/validators/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credentials)
    private credentialsRepository: Repository<Credentials>,
    private jwtService: JwtService,
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

  async validationPassword(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }

  async generateToken(credentials: Credentials) {
    try {
      const payload = {
        enterprise_id: credentials.enterprise.id,
        username: credentials.username,
      };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async refreshToken(body: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(body.refresh_token);
      const credentials = await this.getSchoolCredentials(payload.username);
      if (!credentials) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const newCredentials = await this.generateToken(credentials);
      return newCredentials;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token has expired');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }

  async getSchoolCredentials(username: string) {
    const credentials = await this.credentialsRepository.findOne({
      where: { username },
      relations: ['enterprise'],
    });
    if (!credentials) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return credentials;
  }

  async signIn(username: string, password: string) {
    try {
      const credentials = await this.getSchoolCredentials(username);
      const isValid = await this.validationPassword(
        password,
        credentials.password,
      );
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.generateToken(credentials);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
