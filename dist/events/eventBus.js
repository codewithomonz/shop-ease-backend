import { EventEmitter } from "node:events";
/**
 * Typed, app-wide event bus. Services emit events and return immediately;
 * listeners (e.g. email) run asynchronously so a slow SMTP server never
 * blocks an HTTP response.
 */
class AppEventBus extends EventEmitter {
}
export const eventBus = new AppEventBus();
//# sourceMappingURL=eventBus.js.map