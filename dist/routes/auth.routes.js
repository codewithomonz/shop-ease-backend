import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { loginLimiter, sensitiveLimiter, } from "../middlewares/rateLimit.middleware.js";
import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, updateProfileSchema, } from "../validators/authValidator.js";
export const authRouter = Router();
authRouter.post("/register", sensitiveLimiter, validate(registerSchema), authController.register);
authRouter.post("/login", loginLimiter, validate(loginSchema), authController.login);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.post("/forgot-password", sensitiveLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
authRouter.post("/reset-password", sensitiveLimiter, validate(resetPasswordSchema), authController.resetPassword);
authRouter.get("/me", authenticate, authController.me);
authRouter.patch("/me", authenticate, validate(updateProfileSchema), authController.updateMe);
authRouter.patch("/change-password", authenticate, validate(changePasswordSchema), authController.changePassword);
//# sourceMappingURL=auth.routes.js.map