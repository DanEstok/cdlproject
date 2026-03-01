import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonType } from '@recovery-platform/types';
export declare class PeopleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPersonDto: CreatePersonDto, organizationId: string): Promise<any>;
    findAll(organizationId: string, type?: PersonType, search?: string): Promise<any>;
    findOne(id: string, organizationId: string): Promise<any>;
    update(id: string, updatePersonDto: Partial<CreatePersonDto>, organizationId: string): Promise<any>;
    private createAuditEvent;
}
