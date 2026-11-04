import jwt, {} from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";
export function signAccessToken(payload) {
    const options = {
        algorithm: "HS256",
        subject: payload.userId,
        expiresIn: env.jwtAccessExpiresIn,
    };
    return jwt.sign({ email: payload.email, role: payload.role, tv: payload.tokenVersion }, env.jwtAccessSecret, options);
}
export function verifyAccessToken(token) {
    try {
        const claims = jwt.verify(token, env.jwtAccessSecret, {
            algorithms: ["HS256"],
        });
        return {
            userId: claims.sub,
            email: claims.email,
            role: claims.role,
            tokenVersion: claims.tv,
        };
    }
    catch {
        throw new AppError(401, "Invalid or expired access token");
    }
}
//# sourceMappingURL=jwt.js.map