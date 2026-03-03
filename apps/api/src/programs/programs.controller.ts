import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ProgramsService } from "./programs.service";

@Controller("programs")
@UseGuards(AuthGuard)
export class ProgramsController {
  constructor(private programs: ProgramsService) {}

  @Get()
  list(@Req() req: any) {
    return this.programs.list(req.user.organizationId);
  }

  @Post()
  create(@Req() req: any, @Body() body: { programKey: string; displayName: string; description?: string }) {
    return this.programs.create(req.user.organizationId, body);
  }

  @Patch(":programKey")
  update(
    @Req() req: any,
    @Param("programKey") programKey: string,
    @Body() body: { displayName?: string; description?: string; enabled?: boolean }
  ) {
    return this.programs.update(req.user.organizationId, programKey, body);
  }

  @Post(":programKey/clone")
  clone(
    @Req() req: any,
    @Param("programKey") programKey: string,
    @Body() body: { programKey: string; displayName: string; description?: string }
  ) {
    return this.programs.clone(req.user.organizationId, programKey, body);
  }
}
