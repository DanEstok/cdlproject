import { VerificationType } from "@prisma/client";
export declare const VerificationDefaultIntervalsDays: Record<VerificationType, number>;
export declare function addDays(date: Date, days: number): Date;
export declare function computeDefaultNextDueAt(type: VerificationType, from: Date): Date;
