import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { PeopleService } from "./people.service";
import { CreatePersonDto, UpdatePersonDto } from "./dto";

@Controller("people")
@UseGuards(AuthGuard)
export class PeopleController {
  constructor(private people: PeopleService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreatePersonDto) {
    return this.people.create(req.user.organizationId, req.user, dto);
  }

  @Get()
  list(@Req() req: any, @Query("type") type?: string, @Query("search") search?: string) {
    return this.people.list(req.user.organizationId, { type, search });
  }

  @Get(":id")
  get(@Req() req: any, @Param("id") id: string) {
    return this.people.get(req.user.organizationId, id);
  }

  @Patch(":id")
  update(@Req() req: any, @Param("id") id: string, @Body() dto: UpdatePersonDto) {
    return this.people.update(req.user.organizationId, req.user, id, dto);
  }
}
