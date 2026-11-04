/** Baseline limit for the whole API. */
export declare const apiLimiter: import("express-rate-limit").RateLimitRequestHandler;
/** Brute-force protection for login: 5 failed attempts per 15 minutes per IP + email. */
export declare const loginLimiter: import("express-rate-limit").RateLimitRequestHandler;
/** Limits sign-ups and password-reset emails to stop spam/abuse. */
export declare const sensitiveLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=rateLimit.middleware.d.ts.map