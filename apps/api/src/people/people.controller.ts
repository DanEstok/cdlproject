import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Request, UseGuards } from "@nestjs/common";
import { PeopleService } from "./people.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("people")
@UseGuards(AuthGuard)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto, @Request() req: any) {
    return this.peopleService.create(createPersonDto, req.user.organizationId);
  }

  @Get()
  findAll(@Request() req: any, @Query('type') type?: string, @Query('search') search?: string) {
    return this.peopleService.findAll(req.user.organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.peopleService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: any, @Request() req: any) {
    return this.peopleService.update(id, updatePersonDto, req.user.organizationId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.peopleService.remove(id, req.user.organizationId);
  }
}
