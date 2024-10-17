import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the category of the product being sold',
  })
  category_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the cage where the product is stored',
  })
  cage_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The quantity of the product being sold' })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The unit price of the product in US dollars (USD)',
  })
  unit_price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The unit weight of the product in kilograms (Kg)',
  })
  unit_weight: number;

  @IsString()
  @ApiProperty({ description: 'Additional details or notes about the sale' })
  description: string;
}
