import type { Request, Response, NextFunction } from "express";
/** Removes HTML/script from request bodies to prevent stored XSS. */
export declare function sanitizeInput(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=sanitize.middleware.d.ts.map