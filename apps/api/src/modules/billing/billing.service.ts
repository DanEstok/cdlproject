import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  findAll() {
    return [];
  }

  create(data: any) {
    return { id: '1', ...data };
  }
}
