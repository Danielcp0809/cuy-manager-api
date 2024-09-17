import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateEnterpriseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the enterprise' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The address of the enterprise' })
  address: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email associated to enterprise' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The phone of the enterprise' })
  phone: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'The status of the enterprise' })
  is_enabled: boolean;
}

export class UpdateEnterpriseDto extends PartialType(CreateEnterpriseDto) {}
