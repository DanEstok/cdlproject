import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Request } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Organization } from '../../common/decorators/organization.decorator';
import { OrganizationGuard } from '../../common/guards/organization.guard';
import { AuditInterceptor } from '../../common/interceptors/audit.interceptor';
import { UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('people')
@UseGuards(OrganizationGuard)
@UseInterceptors(AuditInterceptor)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @Organization()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @Organization()
  findAll(@Query('type') type?: string, @Query('search') search?: string) {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @Organization()
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(id);
  }

  @Patch(':id')
  @Organization()
  update(@Param('id') id: string, @Body() updatePersonDto: any) {
    return this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @Organization()
  remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }
}
