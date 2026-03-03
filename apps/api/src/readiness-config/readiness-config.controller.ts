import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ReadinessConfigService } from "./readiness-config.service";

@Controller("readiness")
@UseGuards(AuthGuard)
export class ReadinessConfigController {
  constructor(private cfg: ReadinessConfigService) {}

  @Post("ensure-defaults")
  ensureDefaults(@Req() req: any) {
    return this.cfg.ensureDefaults(req.user.organizationId);
  }

  @Get("programs")
  listPrograms(@Req() req: any) {
    return this.cfg.listPrograms(req.user.organizationId);
  }

  @Get("programs/:programKey/requirements")
  getReqs(@Req() req: any, @Param("programKey") programKey: string) {
    return this.cfg.getRequirements(req.user.organizationId, programKey);
  }

  @Put("programs/:programKey/requirements")
  replaceReqs(@Req() req: any, @Param("programKey") programKey: string, @Body() body: { items: any[] }) {
    return this.cfg.replaceRequirements(req.user.organizationId, programKey, body.items || []);
  }
}
