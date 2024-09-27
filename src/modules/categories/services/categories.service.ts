import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Category } from 'src/models/categories.entity';
import { IRequest } from 'src/modules/auth/interfaces/request.interface';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/validators/categories.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(body: CreateCategoryDto, req: IRequest) {
    try {
      const category = await this.categoriesRepository.findOneBy({
        name: body.name,
        enterprise_id: req.user.enterprise_id,
      });
      if (category) {
        throw new BadRequestException('Category already exists');
      }
      const newCategory = this.categoriesRepository.create(body);
      newCategory.enterprise_id = req.user.enterprise_id;
      await this.categoriesRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCategory(id: string, body: UpdateCategoryDto, req: IRequest) {
    try {
      if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
      const category = await this.categoriesRepository.findOneBy({
        id,
        enterprise_id: req.user.enterprise_id,
      });
      if (!category) throw new BadRequestException('Category not found');
      this.categoriesRepository.merge(category, body);
      return await this.categoriesRepository.save(category);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCategories(req: IRequest) {
    try {
      return await this.categoriesRepository.find({
        where: { enterprise_id: req.user.enterprise_id },
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCategory(id: string) {
    try {
      if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
      const category = await this.categoriesRepository.findOneBy({
        id,
      });
      if (!category) throw new NotFoundException('Category not found');
      await this.categoriesRepository.delete({ id });
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
