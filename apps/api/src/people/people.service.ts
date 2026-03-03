import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePersonDto } from "./dto/create-person.dto";

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto, organizationId: string) {
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
        type: createPersonDto.type as any, // Cast to Prisma enum
        dob: createPersonDto.dateOfBirth ? new Date(createPersonDto.dateOfBirth) : undefined,
        organization: {
          connect: { id: organizationId }
        }
      },
    });
    return person;
  }

  async findAll(organizationId: string) {
    return this.prisma.person.findMany({
      where: {
        organizationId: organizationId,
      },
    });
  }

  async findOne(id: string, organizationId: string) {
    return this.prisma.person.findFirst({
      where: {
        id,
        organizationId: organizationId,
      },
    });
  }

  async update(id: string, updatePersonDto: any, organizationId: string) {
    return this.prisma.person.update({
      where: { id },
      data: updatePersonDto,
    });
  }

  async remove(id: string, organizationId: string) {
    return this.prisma.person.delete({
      where: { id },
    });
  }
}
