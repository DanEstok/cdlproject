"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const tasks_service_1 = require("./tasks.service");
const dto_1 = require("./dto");
let TasksController = class TasksController {
    constructor(tasks) {
        this.tasks = tasks;
    }
    create(req, caseId, dto) {
        return this.tasks.create(req.user.organizationId, req.user, caseId, dto);
    }
    list(req, caseId, status) {
        return this.tasks.list(req.user.organizationId, caseId, { status });
    }
    my(req, status) {
        return this.tasks.myTasks(req.user.organizationId, req.user.userId, { status });
    }
    update(req, id, dto) {
        return this.tasks.update(req.user.organizationId, req.user, id, dto);
    }
    complete(req, id) {
        return this.tasks.complete(req.user.organizationId, req.user, id);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)("cases/:caseId/tasks"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("caseId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("cases/:caseId/tasks"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("caseId")),
    __param(2, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("tasks/my"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "my", null);
__decorate([
    (0, common_1.Patch)("tasks/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("tasks/:id/complete"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "complete", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map