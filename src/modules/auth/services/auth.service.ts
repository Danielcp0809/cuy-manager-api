import {
  BadRequestException,
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
      const credentials = await this.getEnterpriseCredentials(payload.username);
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

  async getEnterpriseCredentials(username: string) {
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
      const credentials = await this.getEnterpriseCredentials(username);
      const isValid = await this.validationPassword(
        password,
        credentials.password,
      );
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const tokens = await this.generateToken(credentials);
      return {
        enterprise: credentials.enterprise,
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async generateRecoveryPasswordCode(credentials: Credentials) {
    // generate 4 digits code randomly
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    // generate a date in milliseconds
    const date = new Date().getTime();
    credentials.reset_password_code = code;
    credentials.reset_password_date = date;
    await this.credentialsRepository.save(credentials);
    // send email
    this.emailService.sendRecoveryPasswordEmail(
      code,
      credentials.enterprise.email,
      credentials.enterprise.name,
    );
  }

  async forgotPassword(email: string) {
    try {
      const credentials = await this.credentialsRepository.findOne({
        where: { username: email },
        relations: ['enterprise'],
      });
      if (!credentials) {
        throw new NotFoundException('Enterprise not found');
      }
      // compare if the last reset password is less than 5 minutes
      if (
        credentials.reset_password_date &&
        new Date().getTime() - credentials.reset_password_date < 300000
      ) {
        // return the remainder time in milliseconds
        const remainderTime =
          300000 - (new Date().getTime() - credentials.reset_password_date);
        throw new ForbiddenException(
          JSON.stringify({
            message:
              'The code has been sent, please wait 5 minutes to request a new one',
            remainderTime,
          }),
        );
      }
      await this.generateRecoveryPasswordCode(credentials);
      return {
        message: `Recovery password code sent to your email ${credentials.enterprise.email}`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  private async validateCredentials(email: string, code: string) {
    const credentials = await this.credentialsRepository.findOne({
      where: { username: email },
    });

    if (!credentials) {
      throw new NotFoundException('Enterprise not found');
    }

    if (!credentials.reset_password_code) {
      throw new BadRequestException(
        'Reset password code has not been generated',
      );
    }

    const currentTime = new Date().getTime();
    const codeGenerationTime = credentials.reset_password_date || 0;
    const timeDifference = currentTime - codeGenerationTime;

    if (timeDifference > 300000) {
      // 5 minutes in milliseconds
      throw new ForbiddenException('Reset password code has expired');
    }

    if (credentials.reset_password_code !== code) {
      throw new UnauthorizedException('Invalid reset password code');
    }

    return credentials;
  }

  async verifyCode(email: string, code: string) {
    await this.validateCredentials(email, code);
    return {
      message: 'Code verified successfully',
    };
  }

  async changePassword(email: string, password: string, code: string) {
    const credentials = await this.validateCredentials(email, code);

    credentials.password = await this.encryptPassword(password);
    credentials.reset_password_code = null;
    credentials.reset_password_date = 0;

    await this.credentialsRepository.save(credentials);

    return {
      message: 'Password changed successfully',
    };
  }
}
