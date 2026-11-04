import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { taskRouter } from "./tasks.routes.js";
import { productRouter } from "./products.routes.js";
import { authRouter } from "./auth.routes.js";
import { orderRouter } from "./orders.routes.js";
export const apiRouter = Router();
apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", taskRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);
//# sourceMappingURL=index.js.map