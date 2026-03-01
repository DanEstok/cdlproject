import { PersonType } from '@recovery-platform/types';
export declare class CreatePersonDto {
    type: PersonType;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    dob?: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
}
