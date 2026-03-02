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
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const people_service_1 = require("./people.service");
const create_person_dto_1 = require("./dto/create-person.dto");
const organization_decorator_1 = require("../../common/decorators/organization.decorator");
const organization_guard_1 = require("../../common/guards/organization.guard");
const audit_interceptor_1 = require("../../common/interceptors/audit.interceptor");
const common_2 = require("@nestjs/common");
let PeopleController = class PeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    create(createPersonDto) {
        return this.peopleService.create(createPersonDto);
    }
    findAll(type, search) {
        return this.peopleService.findAll();
    }
    findOne(id) {
        return this.peopleService.findOne(id);
    }
    update(id, updatePersonDto) {
        return this.peopleService.update(id, updatePersonDto);
    }
    remove(id) {
        return this.peopleService.remove(id);
    }
};
exports.PeopleController = PeopleController;
__decorate([
    (0, common_1.Post)(),
    (0, organization_decorator_1.Organization)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, organization_decorator_1.Organization)(),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, organization_decorator_1.Organization)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, organization_decorator_1.Organization)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, organization_decorator_1.Organization)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "remove", null);
exports.PeopleController = PeopleController = __decorate([
    (0, common_1.Controller)('people'),
    (0, common_2.UseGuards)(organization_guard_1.OrganizationGuard),
    (0, common_2.UseInterceptors)(audit_interceptor_1.AuditInterceptor),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleController);
//# sourceMappingURL=people.controller.js.map