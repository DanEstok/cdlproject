import { SetMetadata } from '@nestjs/common';

export const ORGANIZATION_ID_KEY = 'organizationId';
export const Organization = () => SetMetadata(ORGANIZATION_ID_KEY, true);
