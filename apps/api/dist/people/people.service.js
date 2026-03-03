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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PeopleService = class PeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPersonDto, organizationId) {
        const person = await this.prisma.person.create({
            data: {
                firstName: createPersonDto.firstName,
                lastName: createPersonDto.lastName,
                email: createPersonDto.email,
                phone: createPersonDto.phone,
                address1: createPersonDto.address,
                city: createPersonDto.city,
                state: createPersonDto.state,
                postalCode: createPersonDto.zip,
                type: createPersonDto.type,
                dob: createPersonDto.dateOfBirth ? new Date(createPersonDto.dateOfBirth) : undefined,
                organization: {
                    connect: { id: organizationId }
                }
            },
        });
        return person;
    }
    async findAll(organizationId) {
        return this.prisma.person.findMany({
            where: {
                organizationId: organizationId,
            },
        });
    }
    async findOne(id, organizationId) {
        return this.prisma.person.findFirst({
            where: {
                id,
                organizationId: organizationId,
            },
        });
    }
    async update(id, updatePersonDto, organizationId) {
        return this.prisma.person.update({
            where: { id },
            data: updatePersonDto,
        });
    }
    async remove(id, organizationId) {
        return this.prisma.person.delete({
            where: { id },
        });
    }
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeopleService);
//# sourceMappingURL=people.service.js.map