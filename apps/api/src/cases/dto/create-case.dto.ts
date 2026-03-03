import { IsString, IsOptional, IsEnum } from 'class-validator';
import { CreatePersonDto } from '../../people/dto/create-person.dto';

export class CreateCaseDto {
  @IsOptional()
  clientPersonId?: string;

  @IsOptional()
  client?: CreatePersonDto;

  @IsOptional()
  @IsString()
  notes?: string;
}
