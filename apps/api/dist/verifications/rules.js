"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationDefaultIntervalsDays = void 0;
exports.addDays = addDays;
exports.computeDefaultNextDueAt = computeDefaultNextDueAt;
exports.VerificationDefaultIntervalsDays = {
    DOT_MEDICAL: 730,
    MVR: 365,
    CLEARINGHOUSE: 365
};
function addDays(date, days) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}
function computeDefaultNextDueAt(type, from) {
    const days = exports.VerificationDefaultIntervalsDays[type];
    return days ? addDays(from, days) : null;
}
//# sourceMappingURL=rules.js.map