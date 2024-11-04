import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFattenDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'Unique identifier for the origin cage' })
  origin_cage_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'Unique identifier for the destination cage' })
  destiny_cage_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Number of animals to be transferred' })
  quantity: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the category of the animals',
  })
  category_id: string;

  @IsString()
  @ApiProperty({
    description: 'Additional details or notes about the transfer',
  })
  description: string;
}
