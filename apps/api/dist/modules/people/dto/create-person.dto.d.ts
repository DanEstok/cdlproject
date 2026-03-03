export declare enum PersonType {
    CLIENT = "CLIENT",
    CONTACT = "CONTACT",
    REFERRAL_SOURCE = "REFERRAL_SOURCE"
}
export declare class CreatePersonDto {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    type: PersonType;
    dateOfBirth?: string;
    ssn?: string;
    notes?: string;
}
