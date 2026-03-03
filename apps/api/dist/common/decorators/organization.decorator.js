"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = exports.ORGANIZATION_ID_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ORGANIZATION_ID_KEY = 'organizationId';
const Organization = () => (0, common_1.SetMetadata)(exports.ORGANIZATION_ID_KEY, true);
exports.Organization = Organization;
//# sourceMappingURL=organization.decorator.js.map