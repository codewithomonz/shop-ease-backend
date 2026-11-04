import { AppError } from "../errors/AppError.js";
export function requireAdmin(req, _res, next) {
    if (req.user?.role !== "ADMIN") {
        next(new AppError(403, "Admin Access required. You do not have admin access"));
        return;
    }
    next();
}
//# sourceMappingURL=admin.middleware.js.map