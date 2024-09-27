import { PartialType } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsHexColor()
  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  price: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
