import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { OrganizationGuard } from '../../common/guards/organization.guard';
import { Organization } from '../../common/decorators/organization.decorator';
import { AuditInterceptor } from '../../common/interceptors/audit.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Controller('people')
@UseGuards(OrganizationGuard)
@Organization()
@UseInterceptors(AuditInterceptor)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto, @Request() req) {
    return this.peopleService.create(createPersonDto, req.organizationId);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    return this.peopleService.findAll(req.organizationId, type as any, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.peopleService.findOne(id, req.organizationId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonDto: Partial<CreatePersonDto>,
    @Request() req,
  ) {
    return this.peopleService.update(id, updatePersonDto, req.organizationId);
  }
}
