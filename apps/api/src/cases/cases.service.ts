import { Injectable } from '@nestjs/common';

@Injectable()
export class CasesService {
  // Basic cases service implementation
  findAll() {
    return [];
  }

  findOne(id: string) {
    return { id, status: 'OPEN' };
  }

  create(data: any) {
    return { id: '1', ...data };
  }
}
