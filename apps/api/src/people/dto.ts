import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export enum PersonType {
  CLIENT = 'CLIENT',
  CONTACT = 'CONTACT',
  PARTNER_CONTACT = 'PARTNER_CONTACT'
}

export class CreatePersonDto {
  @IsEnum(PersonType)
  @IsOptional()
  type?: PersonType;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdatePersonDto {
  @IsEnum(PersonType)
  @IsOptional()
  type?: PersonType;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
