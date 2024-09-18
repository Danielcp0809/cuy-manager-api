import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CagesService } from '../services/cages.service';
import { CreateCageDto, UpdateCageDto } from 'src/validators/cages.dto';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exists/payload-exists.pipe';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Cages')
@Controller('cages')
export class CagesController {
  constructor(private cagesService: CagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new cage' })
  createCage(@Body() body: CreateCageDto, @Req() request: IRequest) {
    return this.cagesService.createCage(body, request);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a cage by id' })
  @UsePipes(new ValidatePayloadExistsPipe())
  updateCage(
    @Param('id') id: string,
    @Body() body: UpdateCageDto,
    @Req() request: IRequest,
  ) {
    return this.cagesService.updateCage(id, body, request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all cages' })
  getAllCages(@Req() request: IRequest) {
    return this.cagesService.getAllCages(request);
  }
}
