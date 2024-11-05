import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeadDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the cage where the animal died',
  })
  cage_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the category of the dead animal',
  })
  category_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Number of dead animals' })
  quantity: number;

  @IsString()
  @ApiProperty({
    description: 'Additional details or notes about the dead animals',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The unit weight of the product in kilograms (Kg)',
  })
  unit_weight: number;

  @IsNumber()
  @ApiProperty({
    description: 'The date when the dead event was made in epoch format',
  })
  date: number;
}
