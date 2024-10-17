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
}
