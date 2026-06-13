declare class generatetoken {
    private accesskey;
    private refreshkey;
    constructor();
    access(id: string, auth: string): string;
    refresh(id: string, auth: string): string;
}
export declare const tokengenerate: generatetoken;
export {};
//# sourceMappingURL=generatetoken.d.ts.map