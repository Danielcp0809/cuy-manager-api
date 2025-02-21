import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
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

  @Post('/breedings')
  @ApiOperation({ summary: 'Get a list of breeding events' })
  @HttpCode(HttpStatus.OK)
  getBreedingEvents(
    @Query('cage_id') cageID: string,
    @Query('male_cage_id') maleCageID: string,
    @Query('male_category_id') maleCategoryID: string,
    @Query('female_cage_id') femaleCageID: string,
    @Query('female_category_id') femaleCategoryID: string,
    @Query('min_date') minDate: number,
    @Query('max_date') maxDate: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Req() request: IRequest,
  ) {
    return this.eventsService.getBreedingEvents(
      {
        cageID,
        maleCageID,
        maleCategoryID,
        femaleCageID,
        femaleCategoryID,
        minDate,
        maxDate,
        page,
        limit,
        sortBy,
        sortOrder,
      },
      request,
    );
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

  @Post('/purchases')
  @ApiOperation({ summary: 'Get a list of sale events' })
  @HttpCode(HttpStatus.OK)
  getPurchaseEvents(
    @Query('category_id') categoryID: string,
    @Query('cage_id') cageID: string,
    @Query('quantity') quantity: number,
    @Query('min_date') minDate: number,
    @Query('max_date') maxDate: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Req() request: IRequest,
  ) {
    return this.eventsService.getPurchaseEvents(
      {
        categoryID,
        cageID,
        quantity,
        minDate,
        maxDate,
        page,
        limit,
        sortBy,
        sortOrder,
      },
      request,
    );
  }

  @Post('/sale')
  @ApiOperation({ summary: 'Create a new purchase event' })
  @HttpCode(HttpStatus.CREATED)
  createSaleEvent(@Body() body: CreateSaleDto, @Req() request: IRequest) {
    return this.eventsService.createSaleEvent(body, request);
  }

  @Get('/sales')
  @ApiOperation({ summary: 'Get a list of sale events' })
  @HttpCode(HttpStatus.OK)
  getSaleEvents(
    @Query('category_id') categoryID: string,
    @Query('cage_id') cageID: string,
    @Query('quantity') quantity: number,
    @Query('min_date') minDate: number,
    @Query('max_date') maxDate: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Req() request: IRequest,
  ) {
    return this.eventsService.getSaleEvents(
      {
        categoryID,
        cageID,
        quantity,
        minDate,
        maxDate,
        page,
        limit,
        sortBy,
        sortOrder,
      },
      request,
    );
  }

  @Post('/fatten')
  @ApiOperation({ summary: 'Create a new fatten event' })
  @HttpCode(HttpStatus.CREATED)
  createFattenEvent(@Body() body: CreateFattenDto, @Req() request: IRequest) {
    return this.eventsService.createFattenEvent(body, request);
  }

  @Post('/fattens')
  @ApiOperation({ summary: 'Get a list of fatten events' })
  @HttpCode(HttpStatus.OK)
  getFattenEvents(
    @Query('origin_cage_id') originCageID: string,
    @Query('destiny_cage_id') destinyCageID: string,
    @Query('category_id') categoryID: string,
    @Query('quantity') quantity: number,
    @Query('min_date') minDate: number,
    @Query('max_date') maxDate: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Req() request: IRequest,
  ) {
    return this.eventsService.getFattenEvents(
      {
        originCageID,
        destinyCageID,
        categoryID,
        quantity,
        minDate,
        maxDate,
        page,
        limit,
        sortBy,
        sortOrder,
      },
      request,
    );
  }

  @Post('/deads')
  @ApiOperation({ summary: 'Get a list of dead events' })
  @HttpCode(HttpStatus.OK)
  getDeadEvents(
    @Query('category_id') categoryID: string,
    @Query('cage_id') cageID: string,
    @Query('quantity') quantity: number,
    @Query('min_date') minDate: number,
    @Query('max_date') maxDate: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Req() request: IRequest,
  ) {
    return this.eventsService.getDeadEvents(
      {
        categoryID,
        cageID,
        quantity,
        minDate,
        maxDate,
        page,
        limit,
        sortBy,
        sortOrder,
      },
      request,
    );
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
