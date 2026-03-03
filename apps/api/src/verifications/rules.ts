import { VerificationType } from "@prisma/client";

/**
 * Defaults can be refined per program.
 * These are reasonable starting points for trucking + safety-sensitive compliance.
 */
export const VerificationDefaultIntervalsDays: Record<VerificationType, number> = {
  DOT_MEDICAL: 730, // 24 months typical
  MVR: 365, // annual review default
  CLEARINGHOUSE: 365 // annual re-check default (can be quarterly depending on policy)
};

export function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

export function computeDefaultNextDueAt(type: VerificationType, from: Date) {
  const days = VerificationDefaultIntervalsDays[type];
  return days ? addDays(from, days) : null;
}
