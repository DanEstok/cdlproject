import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum DocumentType {
  ID = 'ID',
  DOT_MEDICAL = 'DOT_MEDICAL',
  MVR = 'MVR',
  CLEARINGHOUSE = 'CLEARINGHOUSE',
  COURT = 'COURT',
  HOUSING = 'HOUSING',
  EMPLOYMENT = 'EMPLOYMENT',
  OTHER = 'OTHER'
}

export class PresignDocumentDto {
  @IsString()
  fileName!: string;

  @IsString()
  mimeType!: string;

  @IsInt()
  @Min(1)
  sizeBytes!: number;
}

export class CompleteDocumentDto {
  @IsString()
  storageKey!: string;

  @IsString()
  fileName!: string;

  @IsString()
  mimeType!: string;

  @IsInt()
  @Min(1)
  sizeBytes!: number;

  @IsEnum(DocumentType)
  docType!: DocumentType;

  @IsString()
  @IsOptional()
  caseId?: string;

  @IsString()
  @IsOptional()
  personId?: string;

  @IsString()
  @IsOptional()
  issueDate?: string;

  @IsString()
  @IsOptional()
  expiresAt?: string;
}
