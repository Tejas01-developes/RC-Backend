import { NextFunction, Request, Response } from 'express';
interface customreq extends Request {
    id?: string;
    auth?: string;
}
export declare const accessfilter: (req: customreq, resp: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=accessfilter.d.ts.map