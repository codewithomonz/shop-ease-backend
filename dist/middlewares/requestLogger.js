import { logger } from "../lib/logger.js";
export function requestLogger(req, _res, next) {
    logger.info(`${req.method} ${req.originalUrl}`);
    next(); // pass to the next step — without this, the request hangs
}
//# sourceMappingURL=requestLogger.js.map