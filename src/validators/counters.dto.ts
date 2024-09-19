import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCounterDto {
  @IsNotEmpty()
  @IsUUID()
  cage_id: string;

  @IsNotEmpty()
  @IsUUID()
  category_id: string;

  @IsNotEmpty()
  @IsInt()
  amount: number;
}

export class UpdateCounterDto extends PartialType(CreateCounterDto) {}
