import { servicetypes } from '../types.js';
export declare const loginservice: (email: string) => Promise<any>;
export declare const findrefresh: (memberid: string) => Promise<servicetypes | null>;
export declare const inserttokenservice: (memberid: string, token: string, name: string) => Promise<unknown>;
export declare const updatetokenservice: (token: string, memberid: string) => Promise<unknown>;
//# sourceMappingURL=service.d.ts.map