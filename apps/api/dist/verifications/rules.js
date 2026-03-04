"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationDefaultIntervalsDays = void 0;
exports.addDays = addDays;
exports.computeDefaultNextDueAt = computeDefaultNextDueAt;
/**
 * Defaults can be refined per program.
 * These are reasonable starting points for trucking + safety-sensitive compliance.
 */
exports.VerificationDefaultIntervalsDays = {
    DOT_MEDICAL: 730, // 24 months typical
    MVR: 365, // annual review default
    CLEARINGHOUSE: 365 // annual re-check default (can be quarterly depending on policy)
};
function addDays(date, days) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}
function computeDefaultNextDueAt(type, from) {
    const days = exports.VerificationDefaultIntervalsDays[type];
    return days ? addDays(from, days) : null;
}
