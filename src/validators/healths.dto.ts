import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHealthDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description:
      'Unique identifier for the cage where the health event occurred',
  })
  cage_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the category of the health event',
  })
  category_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Number of animals whom a health event were applied',
  })
  quantity: number;

  @IsString()
  @ApiProperty({
    description: 'Additional details or notes about the health event',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The date when the health event occurred in epoch format',
  })
  date: number;
}
