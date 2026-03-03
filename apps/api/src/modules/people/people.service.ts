import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto) {
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
          connect: { id: '00000000-0000-0000-0000-000000000001' }
        }
      },
    });
    return person;
  }

  async findAll() {
    return this.prisma.person.findMany({
      where: {
        organizationId: '00000000-0000-0000-0000-000000000001',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.person.findFirst({
      where: {
        id,
        organizationId: '00000000-0000-0000-0000-000000000001',
      },
    });
  }

  async update(id: string, updatePersonDto: any) {
    return this.prisma.person.update({
      where: { id },
      data: updatePersonDto,
    });
  }

  async remove(id: string) {
    return this.prisma.person.delete({
      where: { id },
    });
  }
}
