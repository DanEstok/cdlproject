import { IsEnum, IsObject, IsOptional, IsString } from "class-validator";

export enum NoteType {
  INTAKE = 'INTAKE',
  PROGRESS = 'PROGRESS',
  DISCHARGE = 'DISCHARGE',
  ASSESSMENT = 'ASSESSMENT',
  TREATMENT = 'TREATMENT',
  REFERRAL = 'REFERRAL',
  OTHER = 'OTHER'
}

export enum NoteStatus {
  DRAFT = 'DRAFT',
  SIGNED = 'SIGNED'
}

export class CreateNoteDto {
  @IsEnum(NoteType)
  noteType!: NoteType;

  @IsString()
  @IsOptional()
  templateKey?: string;

  @IsObject()
  contentJson!: Record<string, any>;

  @IsString()
  @IsOptional()
  narrative?: string;
}

export class UpdateNoteDto {
  @IsObject()
  @IsOptional()
  contentJson?: Record<string, any>;

  @IsString()
  @IsOptional()
  narrative?: string;
}

export class AddendumDto {
  @IsObject()
  contentJson!: Record<string, any>;

  @IsString()
  @IsOptional()
  narrative?: string;
}
