import { IsString, IsOptional, IsEnum, IsEmail, IsDateString } from 'class-validator';

export enum PersonType {
  CLIENT = 'CLIENT',
  CONTACT = 'CONTACT',
  REFERRAL_SOURCE = 'REFERRAL_SOURCE',
}

export class CreatePersonDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsEnum(PersonType)
  type: PersonType;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  ssn?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
