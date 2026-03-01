import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ORGANIZATION_ID_KEY } from '../decorators/organization.decorator';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isOrganizationRequired = this.reflector.get<boolean>(
      ORGANIZATION_ID_KEY,
      context.getHandler(),
    );

    if (!isOrganizationRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.organizationId) {
      return false;
    }

    // Add organizationId to request for easy access in controllers
    request.organizationId = user.organizationId;
    return true;
  }
}
