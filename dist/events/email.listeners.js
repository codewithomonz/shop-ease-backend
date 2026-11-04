import { eventBus } from "./eventBus.js";
import { sendMail } from "../lib/mailer.js";
import { logger } from "../lib/logger.js";
import * as templates from "../emails/templates.js";
/**
 * EventEmitter does not await listeners, so a rejected promise would become an
 * unhandled rejection. Wrap every send so failures are logged, never thrown.
 */
function deliver(to, content, event) {
    sendMail({ to, ...content }).catch((err) => {
        logger.error({ err, to, event }, "failed to send email");
    });
}
let registered = false;
export function registerEmailListeners() {
    if (registered)
        return;
    registered = true;
    eventBus.on("user.registered", ({ name, email }) => {
        deliver(email, templates.welcomeEmail(name), "user.registered");
    });
    eventBus.on("password.resetRequested", ({ name, email, resetUrl, expiresInMinutes }) => {
        deliver(email, templates.passwordResetEmail(name, resetUrl, expiresInMinutes), "password.resetRequested");
    });
    eventBus.on("password.changed", ({ name, email }) => {
        deliver(email, templates.passwordChangedEmail(name), "password.changed");
    });
    eventBus.on("order.created", ({ name, email, order }) => {
        deliver(email, templates.orderCreatedEmail(name, order), "order.created");
    });
    eventBus.on("order.statusChanged", ({ name, email, order }) => {
        deliver(email, templates.orderStatusEmail(name, order), "order.statusChanged");
    });
}
//# sourceMappingURL=email.listeners.js.map