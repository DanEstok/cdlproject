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
const prisma_service_1 = require("../../common/prisma/prisma.service");
let PeopleService = class PeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPersonDto) {
        const person = await this.prisma.person.create({
            data: {
                firstName: createPersonDto.firstName,
                lastName: createPersonDto.lastName,
                email: createPersonDto.email,
                phone: createPersonDto.phone,
                address: createPersonDto.address,
                city: createPersonDto.city,
                state: createPersonDto.state,
                zip: createPersonDto.zip,
                type: createPersonDto.type,
                dob: createPersonDto.dateOfBirth ? new Date(createPersonDto.dateOfBirth) : undefined,
                organization: {
                    connect: { id: 'default-org' }
                }
            },
        });
        return person;
    }
    async findAll() {
        return this.prisma.person.findMany({
            where: {
                organizationId: 'default-org',
            },
        });
    }
    async findOne(id) {
        return this.prisma.person.findFirst({
            where: {
                id,
                organizationId: 'default-org',
            },
        });
    }
    async update(id, updatePersonDto) {
        return this.prisma.person.update({
            where: { id },
            data: updatePersonDto,
        });
    }
    async remove(id) {
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