import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { EventsService } from '../services/events.service';
import { CreateBreedingDto } from 'src/validators/breedings.dto';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import { CreatePurchaseDto } from 'src/validators/purchases.dto';
import { CreateSaleDto } from 'src/validators/sales.dto';
import { CreateFattenDto } from 'src/validators/fattens.dto';
import { CreateDeadDto } from 'src/validators/deads.dto';
import { CreateHealthDto } from 'src/validators/healths.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('/breeding')
  @ApiOperation({ summary: 'Create a new breeding event' })
  @HttpCode(HttpStatus.CREATED)
  createBreedingEvent(
    @Body() body: CreateBreedingDto,
    @Req() request: IRequest,
  ) {
    return this.eventsService.createBreedingEvent(body, request);
  }

  @Post('/purchase')
  @ApiOperation({ summary: 'Create a new purchase event' })
  @HttpCode(HttpStatus.CREATED)
  createPurchaseEvent(
    @Body() body: CreatePurchaseDto,
    @Req() request: IRequest,
  ) {
    return this.eventsService.createPurchaseEvent(body, request);
  }

  @Post('/sale')
  @ApiOperation({ summary: 'Create a new purchase event' })
  @HttpCode(HttpStatus.CREATED)
  createSaleEvent(@Body() body: CreateSaleDto, @Req() request: IRequest) {
    return this.eventsService.createSaleEvent(body, request);
  }

  @Post('/fatten')
  @ApiOperation({ summary: 'Create a new fatten event' })
  @HttpCode(HttpStatus.CREATED)
  createFattenEvent(@Body() body: CreateFattenDto, @Req() request: IRequest) {
    return this.eventsService.createFattenEvent(body, request);
  }

  @Post('/dead')
  @ApiOperation({ summary: 'Create a new dead event' })
  @HttpCode(HttpStatus.CREATED)
  createDeadEvent(@Body() body: CreateDeadDto, @Req() request: IRequest) {
    return this.eventsService.createDeadEvent(body, request);
  }

  @Post('/health')
  @ApiOperation({ summary: 'Create a new health event' })
  @HttpCode(HttpStatus.CREATED)
  createHealthEvent(@Body() body: CreateHealthDto, @Req() request: IRequest) {
    return this.eventsService.createHealthEvent(body, request);
  }
}
