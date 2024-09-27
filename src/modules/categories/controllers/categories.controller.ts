import {
  Body,
  Controller,
  Delete,
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
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/validators/categories.dto';
import { CategoriesService } from '../services/categories.service';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exists/payload-exists.pipe';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new category' })
  createCategory(@Body() body: CreateCategoryDto, @Req() request: IRequest) {
    return this.categoriesService.createCategory(body, request);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a category by id' })
  @UsePipes(new ValidatePayloadExistsPipe())
  updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
    @Req() request: IRequest,
  ) {
    return this.categoriesService.updateCategory(id, body, request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all categories' })
  getAllCategories(@Req() request: IRequest) {
    return this.categoriesService.getAllCategories(request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a category by id' })
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
