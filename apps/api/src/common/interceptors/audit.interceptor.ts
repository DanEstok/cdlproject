import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, organizationId } = request;
    const timestamp = new Date();

    // Store original request data for audit
    request.auditData = {
      method,
      url,
      body: JSON.parse(JSON.stringify(body)), // Deep copy
      user,
      organizationId,
      timestamp,
    };

    return next.handle();
  }
}
