import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
export declare class PeopleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPersonDto: CreatePersonDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePersonDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
