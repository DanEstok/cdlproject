import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createPersonDto: CreatePersonDto, req: any): Promise<any>;
    findAll(req: any, type?: string, search?: string): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    update(id: string, updatePersonDto: Partial<CreatePersonDto>, req: any): Promise<any>;
}
