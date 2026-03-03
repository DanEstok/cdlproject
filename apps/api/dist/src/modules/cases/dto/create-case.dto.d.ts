import { CreatePersonDto } from '../../people/dto/create-person.dto';
export declare class CreateCaseDto {
    clientPersonId?: string;
    client?: CreatePersonDto;
    notes?: string;
}
