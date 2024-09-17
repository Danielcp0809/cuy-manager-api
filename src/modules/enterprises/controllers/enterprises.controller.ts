import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/modules/auth/guards/api-key.guard';
import { EnterprisesService } from '../services/enterprises.service';
import { CreateEnterpriseDto } from 'src/validators/enterprises.dto';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exists/payload-exists.pipe';

@UseGuards(ApiKeyGuard)
@ApiTags('Enterprises')
@Controller('enterprises')
export class EnterprisesController {
  constructor(private enterprisesService: EnterprisesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new enterprise' })
  createEnterprise(@Body() body: CreateEnterpriseDto) {
    return this.enterprisesService.createEnterprises(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an enterprise by id' })
  @UsePipes(new ValidatePayloadExistsPipe())
  updateEnterprise(@Param('id') id: string, @Body() body: CreateEnterpriseDto) {
    return this.enterprisesService.updateEnterprise(id, body);
  }
}
