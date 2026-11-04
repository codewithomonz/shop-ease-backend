import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.js";
import { idParamSchema } from "../validators/common.js";
import { createOrderSchema, orderQuerySchema, updateOrderStatusSchema, } from "../validators/orderValidator.js";
export const orderRouter = Router();
orderRouter.use(authenticate);
// Customer
orderRouter.post("/", validate(createOrderSchema), orderController.createOrder);
orderRouter.get("/me", validate(orderQuerySchema, "query"), orderController.getMyOrders);
orderRouter.patch("/:id/cancel", validate(idParamSchema, "params"), orderController.cancelOrder);
// Admin
orderRouter.get("/", requireAdmin, validate(orderQuerySchema, "query"), orderController.getAllOrders);
orderRouter.patch("/:id/status", requireAdmin, validate(idParamSchema, "params"), validate(updateOrderStatusSchema), orderController.updateOrderStatus);
// Owner or admin
orderRouter.get("/:id", validate(idParamSchema, "params"), orderController.getOrderById);
//# sourceMappingURL=orders.routes.js.map