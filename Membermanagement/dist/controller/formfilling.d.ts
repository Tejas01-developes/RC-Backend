import { Request, Response } from "express";
export declare const formfilling: (req: Request, resp: Response) => Promise<void>;
interface customreq extends Request {
    id?: string;
    auth?: string;
}
export declare const setauth: (req: customreq, resp: Response) => void;
export declare const addevent: (req: customreq, resp: Response) => void;
export declare const getevent: (_req: Request, resp: Response) => void;
export declare const getcount: (_req: Request, resp: Response) => void;
export declare const dopayment: (_req: Request, resp: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifypayment: (req: Request, resp: Response) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=formfilling.d.ts.map