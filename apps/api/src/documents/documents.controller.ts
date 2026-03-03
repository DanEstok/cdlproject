import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { DocumentsService } from "./documents.service";
import { CompleteDocumentDto, PresignDocumentDto } from "./dto";

@Controller("documents")
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(private docs: DocumentsService) {}

  @Post("presign")
  presign(@Req() req: any, @Body() dto: PresignDocumentDto) {
    return this.docs.presign(req.user.organizationId, dto);
  }

  @Post("complete")
  complete(@Req() req: any, @Body() dto: CompleteDocumentDto) {
    return this.docs.complete(req.user.organizationId, req.user, dto);
  }

  @Get()
  list(@Req() req: any, @Query("caseId") caseId?: string, @Query("personId") personId?: string) {
    return this.docs.list(req.user.organizationId, { caseId, personId });
  }

  @Post("presign-download")
  presignDownload(@Req() req: any, @Body() body: { documentId: string }) {
    return this.docs.presignDownload(req.user.organizationId, req.user, body.documentId);
  }
}
