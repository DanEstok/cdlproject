import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { VerificationsService } from "./verifications.service";
import { CreateVerificationDto, UpdateVerificationDto } from "./dto";

@Controller()
@UseGuards(AuthGuard)
export class VerificationsController {
  constructor(private verifs: VerificationsService) {}

  @Post("cases/:caseId/verifications")
  create(@Req() req: any, @Param("caseId") caseId: string, @Body() dto: CreateVerificationDto) {
    return this.verifs.create(req.user.organizationId, req.user, caseId, dto);
  }

  @Get("cases/:caseId/verifications")
  list(@Req() req: any, @Param("caseId") caseId: string) {
    return this.verifs.list(req.user.organizationId, caseId);
  }

  @Patch("verifications/:id")
  update(@Req() req: any, @Param("id") id: string, @Body() dto: UpdateVerificationDto) {
    return this.verifs.update(req.user.organizationId, req.user, id, dto);
  }

  @Post("verifications/:id/complete-from-evidence")
  completeFromEvidence(@Req() req: any, @Param("id") id: string) {
    return this.verifs.completeFromEvidence(req.user.organizationId, req.user, id);
  }
}
