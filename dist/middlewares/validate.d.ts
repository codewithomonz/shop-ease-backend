import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
type Source = "body" | "params" | "query";
export declare const validate: (schema: ZodType, source?: Source) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=validate.d.ts.map