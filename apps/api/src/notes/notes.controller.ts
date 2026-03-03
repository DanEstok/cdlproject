import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { NotesService } from "./notes.service";
import { AddendumDto, CreateNoteDto, UpdateNoteDto } from "./dto";

@Controller()
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private notes: NotesService) {}

  @Post("cases/:caseId/notes")
  create(@Req() req: any, @Param("caseId") caseId: string, @Body() dto: CreateNoteDto) {
    return this.notes.create(req.user.organizationId, req.user, caseId, dto);
  }

  @Get("cases/:caseId/notes")
  list(@Req() req: any, @Param("caseId") caseId: string) {
    return this.notes.list(req.user.organizationId, caseId);
  }

  @Patch("notes/:id")
  update(@Req() req: any, @Param("id") id: string, @Body() dto: UpdateNoteDto) {
    return this.notes.update(req.user.organizationId, req.user, id, dto);
  }

  @Post("notes/:id/sign")
  sign(@Req() req: any, @Param("id") id: string) {
    return this.notes.sign(req.user.organizationId, req.user, id);
  }

  @Post("notes/:id/addendum")
  addendum(@Req() req: any, @Param("id") id: string, @Body() dto: AddendumDto) {
    return this.notes.addendum(req.user.organizationId, req.user, id, dto);
  }
}
