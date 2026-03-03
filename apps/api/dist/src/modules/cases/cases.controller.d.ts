import { CasesService } from './cases.service';
export declare class CasesController {
    private readonly casesService;
    constructor(casesService: CasesService);
    findAll(): any[];
    findOne(id: string): {
        id: string;
        status: string;
    };
    create(data: any): any;
}
