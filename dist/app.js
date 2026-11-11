import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import { sanitizeInput } from "./middlewares/sanitize.middleware.js";
import { AppError } from "./errors/AppError.js";
import { apiRouter } from "./routes/index.js";
import { docsRouter } from "./routes/docs.routes.js";
export function createApp() {
    const app = express();
    // Turn "https://*.vercel.app" or "http://localhost:*" into a RegExp
    function toOriginMatcher(pattern) {
        if (pattern === "*")
            return () => true;
        if (!pattern.includes("*"))
            return (origin) => origin === pattern;
        const escaped = pattern
            .replace(/[.+?^${}()|[\]\\]/g, "\\$&") // escape regex chars
            .replace(/\\\*/g, "*") // (in case * got escaped)
            .replace(/\*/g, "[^/]*"); // * = anything except '/'
        const regex = new RegExp(`^${escaped}$`);
        return (origin) => regex.test(origin);
    }
    const originMatchers = env.corsOrigins.map(toOriginMatcher);
    const isOriginAllowed = (origin) => originMatchers.some((m) => m(origin));
    // Needed behind a reverse proxy (Render, Nginx, etc.) so rate limiting sees the real client IP.
    if (env.trustProxy > 0)
        app.set("trust proxy", env.trustProxy);
    app.disable("x-powered-by");
    // Security headers (CSP, X-Content-Type-Options, frameguard, HSTS, ...)
    // app.use(helmet());
    app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
    // CORS: only allow configured front-end origins.
    app.use(cors({
        origin(origin, callback) {
            // Non-browser clients (curl, Postman, server-to-server) send no Origin header.
            if (!origin || isOriginAllowed(origin)) {
                callback(null, true);
            }
            else {
                callback(new AppError(403, `Origin ${origin} not allowed by CORS`));
            }
        },
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        maxAge: 600,
    }));
    // app.use(
    //   cors({
    //     origin(origin, callback) {
    //       // Allow non-browser clients (curl, Postman, server-to-server) with no Origin header.
    //       if (!origin || env.corsOrigins.includes(origin)) {
    //         callback(null, true);
    //       } else {
    //         callback(new AppError(403, "Origin not allowed by CORS"));
    //       }
    //     },
    //     methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    //     allowedHeaders: ["Content-Type", "Authorization"],
    //     maxAge: 600,
    //   }),
    // );
    // Body parsing with size limits (mitigates large-payload DoS)
    app.use(express.json({ limit: "10kb" }));
    app.use(express.urlencoded({ extended: true, limit: "10kb" }));
    // XSS: strip HTML from incoming data
    app.use(sanitizeInput);
    app.use(requestLogger);
    app.use("/", docsRouter);
    app.use("/api/v1", apiLimiter, apiRouter);
    //error handler
    app.use(notFound);
    app.use(errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map