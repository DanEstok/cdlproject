import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export enum VerificationType {
  BACKGROUND_CHECK = 'BACKGROUND_CHECK',
  DRUG_TEST = 'DRUG_TEST',
  EMPLOYMENT_VERIFICATION = 'EMPLOYMENT_VERIFICATION',
  EDUCATION_VERIFICATION = 'EDUCATION_VERIFICATION',
  REFERENCE_CHECK = 'REFERENCE_CHECK',
  CREDIT_CHECK = 'CREDIT_CHECK',
  PROFESSIONAL_LICENSE = 'PROFESSIONAL_LICENSE',
  CERTIFICATION = 'CERTIFICATION',
  MEDICAL_EXAM = 'MEDICAL_EXAM',
  OTHER = 'OTHER'
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  NOT_REQUIRED = 'NOT_REQUIRED'
}

export class CreateVerificationDto {
  @IsEnum(VerificationType)
  type!: VerificationType;

  @IsEnum(VerificationStatus)
  @IsOptional()
  status?: VerificationStatus;

  @IsDateString()
  @IsOptional()
  nextDueAt?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  evidenceDocumentId?: string;
}

export class UpdateVerificationDto {
  @IsEnum(VerificationStatus)
  @IsOptional()
  status?: VerificationStatus;

  @IsDateString()
  @IsOptional()
  nextDueAt?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  evidenceDocumentId?: string;
}
