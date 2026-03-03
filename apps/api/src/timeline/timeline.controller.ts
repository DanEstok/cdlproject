import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { TimelineService } from "./timeline.service";

@Controller()
@UseGuards(AuthGuard)
export class TimelineController {
  constructor(private timeline: TimelineService) {}

  @Get("cases/:caseId/timeline")
  caseTimeline(@Req() req: any, @Param("caseId") caseId: string) {
    return this.timeline.caseTimeline(req.user.organizationId, caseId);
  }
}
