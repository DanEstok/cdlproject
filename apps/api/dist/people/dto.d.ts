export declare enum PersonType {
    CLIENT = "CLIENT",
    CONTACT = "CONTACT",
    PARTNER_CONTACT = "PARTNER_CONTACT"
}
export declare class CreatePersonDto {
    type?: PersonType;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
}
export declare class UpdatePersonDto {
    type?: PersonType;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
}
