import type { Request, Response, NextFunction } from "express";
/**
 * Verifies the Bearer JWT, then checks the user still exists and that the
 * token's version matches the DB. Changing/resetting a password or logging out
 * bumps the version, which revokes every previously issued token.
 */
export declare function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map