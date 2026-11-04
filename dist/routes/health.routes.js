import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server health is good",
    });
});
//# sourceMappingURL=health.routes.js.map