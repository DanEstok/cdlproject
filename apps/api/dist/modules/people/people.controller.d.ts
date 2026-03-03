import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    getPublic(): {
        message: string;
        timestamp: Date;
    };
    testCreate(createPersonDto: CreatePersonDto): Promise<any>;
    findAll(type?: string, search?: string): Promise<any>;
    create(createPersonDto: CreatePersonDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePersonDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
