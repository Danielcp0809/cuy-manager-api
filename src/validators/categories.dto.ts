import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
