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
        address: createPersonDto.address,
        city: createPersonDto.city,
        state: createPersonDto.state,
        zip: createPersonDto.zip,
        type: createPersonDto.type as any, // Cast to Prisma enum
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

  async findOne(id: string) {
    return this.prisma.person.findFirst({
      where: {
        id,
        organizationId: 'default-org',
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
