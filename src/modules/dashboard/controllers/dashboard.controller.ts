import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { DashboardService } from '../services/dashboard.service';
import { ApiOperation } from '@nestjs/swagger';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/categories')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get categories chart data' })
  getCategoriesChartData(@Req() request: IRequest) {
    return this.dashboardService.getCategoriesChartData(request);
  }

  @Get('/cages')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get categories chart data' })
  getCagesChartData(@Req() request: IRequest) {
    return this.dashboardService.getCagesChartData(request);
  }

  @Get('/stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get categories chart data' })
  getStatsData(@Req() request: IRequest) {
    return this.dashboardService.getStatsData(request);
  }
}
