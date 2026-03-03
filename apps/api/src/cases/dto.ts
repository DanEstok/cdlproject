import { IsOptional, IsString } from "class-validator";

export class CreateCaseDto {
  @IsString()
  clientPersonId!: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateCaseDto {
  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  status?: "OPEN" | "PAUSED" | "CLOSED";
}
