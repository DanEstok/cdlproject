import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonType } from '@recovery-platform/types';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto, organizationId: string) {
    const person = await this.prisma.person.create({
      data: {
        ...createPersonDto,
        organizationId,
        dob: createPersonDto.dob ? new Date(createPersonDto.dob) : null,
      },
    });

    // Create audit event
    await this.createAuditEvent({
      organizationId,
      actorUserId: null, // Will be set by interceptor
      action: 'PERSON_CREATED',
      entityType: 'Person',
      entityId: person.id,
      diffJson: { before: null, after: person },
    });

    return person;
  }

  async findAll(organizationId: string, type?: PersonType, search?: string) {
    const where = {
      organizationId,
      ...(type && { type }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    return this.prisma.person.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, organizationId: string) {
    return this.prisma.person.findFirst({
      where: { id, organizationId },
    });
  }

  async update(id: string, updatePersonDto: Partial<CreatePersonDto>, organizationId: string) {
    const existing = await this.findOne(id, organizationId);
    if (!existing) {
      throw new Error('Person not found');
    }

    const updated = await this.prisma.person.update({
      where: { id },
      data: {
        ...updatePersonDto,
        dob: updatePersonDto.dob ? new Date(updatePersonDto.dob) : undefined,
      },
    });

    // Create audit event
    await this.createAuditEvent({
      organizationId,
      actorUserId: null,
      action: 'PERSON_UPDATED',
      entityType: 'Person',
      entityId: id,
      diffJson: { before: existing, after: updated },
    });

    return updated;
  }

  private async createAuditEvent(data: {
    organizationId: string;
    actorUserId: string | null;
    action: string;
    entityType: string;
    entityId: string;
    diffJson?: any;
  }) {
    return this.prisma.auditEvent.create({
      data: {
        ...data,
        actorClerkUserId: null, // Will be set by interceptor
      },
    });
  }
}
