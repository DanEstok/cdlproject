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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const notes_service_1 = require("./notes.service");
const dto_1 = require("./dto");
let NotesController = class NotesController {
    notes;
    constructor(notes) {
        this.notes = notes;
    }
    create(req, caseId, dto) {
        return this.notes.create(req.user.organizationId, req.user, caseId, dto);
    }
    list(req, caseId) {
        return this.notes.list(req.user.organizationId, caseId);
    }
    update(req, id, dto) {
        return this.notes.update(req.user.organizationId, req.user, id, dto);
    }
    sign(req, id) {
        return this.notes.sign(req.user.organizationId, req.user, id);
    }
    addendum(req, id, dto) {
        return this.notes.addendum(req.user.organizationId, req.user, id, dto);
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Post)("cases/:caseId/notes"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("caseId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.CreateNoteDto]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("cases/:caseId/notes"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("caseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)("notes/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateNoteDto]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("notes/:id/sign"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "sign", null);
__decorate([
    (0, common_1.Post)("notes/:id/addendum"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.AddendumDto]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "addendum", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
