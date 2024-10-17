import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBreedingDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cage_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  male_cage_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  male_category_id: string;

  @IsNotEmpty()
  @IsNumber()
  male_quantity: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  female_cage_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  female_category_id: string;

  @IsNotEmpty()
  @IsNumber()
  female_quantity: number;

  @IsBoolean()
  continuous_breeding: boolean;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  date: number;
}
