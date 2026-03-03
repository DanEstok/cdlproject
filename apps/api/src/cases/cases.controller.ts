import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { CasesService } from "./cases.service";
import { CreateCaseDto, UpdateCaseDto } from "./dto";

@Controller("cases")
@UseGuards(AuthGuard)
export class CasesController {
  constructor(private cases: CasesService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateCaseDto) {
    return this.cases.create(req.user.organizationId, req.user, dto);
  }

  @Get()
  list(@Req() req: any, @Query("status") status?: string, @Query("search") search?: string) {
    return this.cases.list(req.user.organizationId, { status, search });
  }

  @Get(":id")
  get(@Req() req: any, @Param("id") id: string) {
    return this.cases.get(req.user.organizationId, id);
  }

  @Patch(":id")
  update(@Req() req: any, @Param("id") id: string, @Body() dto: UpdateCaseDto) {
    return this.cases.update(req.user.organizationId, req.user, id, dto);
  }

  @Post(":id/close")
  close(@Req() req: any, @Param("id") id: string) {
    return this.cases.close(req.user.organizationId, req.user, id);
  }
}
