import { pino } from "pino";
import { env } from "../config/env.js";
export const logger = pino({
    level: env.loglevel,
    ...(env.isProduction
        ? undefined
        : {
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "SYS:standard",
                },
            },
        }),
});
//# sourceMappingURL=logger.js.map