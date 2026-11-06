import { Router } from "express";

export const docsRouter: Router = Router();

// Sends visitors from the base URL to the published Postman documentation.
docsRouter.get("/", (_req, res) => {
  const docsUrl = process.env.API_DOCS_URL;

  if (!docsUrl) {
    res.status(503).json({ message: "API documentation is not configured" });
    return;
  }

  res.redirect(302, docsUrl);
});
