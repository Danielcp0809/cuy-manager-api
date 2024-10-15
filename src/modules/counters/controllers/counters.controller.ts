import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CountersService } from '../services/counters.service';
import {
  CreateCounterDto,
  UpdateCounterDto,
} from 'src/validators/counters.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exists/payload-exists.pipe';

@UseGuards(JwtAuthGuard)
@ApiTags('Counters')
@Controller('counters')
export class CountersController {
  constructor(private countersService: CountersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new counter' })
  createCounter(@Body() body: CreateCounterDto) {
    return this.countersService.createCounter(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a counter by id' })
  @UsePipes(new ValidatePayloadExistsPipe())
  updateCounter(@Param('id') id: string, @Body() body: UpdateCounterDto) {
    return this.countersService.updateCounter(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a counter by id' })
  deleteCounter(@Param('id') id: string) {
    return this.countersService.deleteCounter(id);
  }
}
