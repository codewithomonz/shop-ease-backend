import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { pool } from "./lib/db.js";
import { verifyMailer } from "./lib/mailer.js";
import { registerEmailListeners } from "./events/email.listeners.js";
registerEmailListeners();
void verifyMailer();
const app = createApp();
const server = app.listen(env.port, () => {
    logger.info(`server is running on port ${env.port}`);
});
function shutdown(signal) {
    logger.info(`${signal} received, shutting down`);
    server.close(() => {
        pool.end().finally(() => process.exit(0));
    });
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
//# sourceMappingURL=server.js.map