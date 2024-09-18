import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCageDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsInt()
  capacity: number;
}

export class UpdateCageDto extends PartialType(CreateCageDto) {}
