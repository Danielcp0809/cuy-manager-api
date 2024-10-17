import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique identifier for the category of the purchase',
  })
  category_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Unique identifier for the cage where the items will be stored',
  })
  cage_id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Number of items purchased' })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Average weight of the purchased items in kilograms (Kg)',
  })
  weight: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Total cost of the purchase in US dollars (USD)',
  })
  total_price: number;

  @IsString()
  @ApiProperty({
    description: 'Additional details or notes about the purchase',
  })
  description: string;
}
