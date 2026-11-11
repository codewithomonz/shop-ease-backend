import { Router } from "express";
import { env } from "../config/env.js";
export const docsRouter = Router();
// Sends visitors from the base URL to the published Postman documentation.
docsRouter.get("/", (_req, res) => {
    const docsUrl = env.apiDocs;
    if (!docsUrl) {
        res.status(503).json({ message: "API documentation is not configured" });
        return;
    }
    res.redirect(302, docsUrl);
});
//# sourceMappingURL=docs.routes.js.map