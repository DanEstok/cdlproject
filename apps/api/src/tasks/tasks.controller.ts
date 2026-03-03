import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@Controller()
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasks: TasksService) {}

  // Create task under a case
  @Post("cases/:caseId/tasks")
  create(@Req() req: any, @Param("caseId") caseId: string, @Body() dto: CreateTaskDto) {
    return this.tasks.create(req.user.organizationId, req.user, caseId, dto);
  }

  // List case tasks
  @Get("cases/:caseId/tasks")
  list(@Req() req: any, @Param("caseId") caseId: string, @Query("status") status?: string) {
    return this.tasks.list(req.user.organizationId, caseId, { status });
  }

  // My tasks
  @Get("tasks/my")
  my(@Req() req: any, @Query("status") status?: string) {
    return this.tasks.myTasks(req.user.organizationId, req.user.userId, { status });
  }

  // Update task
  @Patch("tasks/:id")
  update(@Req() req: any, @Param("id") id: string, @Body() dto: UpdateTaskDto) {
    return this.tasks.update(req.user.organizationId, req.user, id, dto);
  }

  // Complete task
  @Post("tasks/:id/complete")
  complete(@Req() req: any, @Param("id") id: string) {
    return this.tasks.complete(req.user.organizationId, req.user, id);
  }
}
