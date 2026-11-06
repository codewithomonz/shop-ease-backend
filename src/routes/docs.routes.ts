import { Router } from "express";
import { env } from "../config/env.ts";

export const docsRouter: Router = Router();

// Sends visitors from the base URL to the published Postman documentation.
docsRouter.get("/", (_req, res) => {
  const docsUrl = env.apiDocs;

  if (!docsUrl) {
    res.status(503).json({ message: "API documentation is not configured" });
    return;
  }

  res.redirect(302, docsUrl);
});
