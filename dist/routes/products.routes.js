import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { productQuerySchema, productSchema, updateProductSchema, userIdParamSchema, } from "../validators/productValidator.js";
import { idParamSchema } from "../validators/common.js";
import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
export const productRouter = Router();
// Public catalogue
productRouter.get("/", validate(productQuerySchema, "query"), productController.getAllProducts);
productRouter.get("/users/:userId", validate(userIdParamSchema, "params"), validate(productQuerySchema, "query"), productController.getAllProductsByUserId);
productRouter.get("/:id", validate(idParamSchema, "params"), productController.getProductById);
// Admin only
productRouter.post("/", authenticate, requireAdmin, validate(productSchema), productController.createProduct);
productRouter.patch("/:id", authenticate, requireAdmin, validate(idParamSchema, "params"), validate(updateProductSchema), productController.updateProduct);
productRouter.delete("/:id", authenticate, requireAdmin, validate(idParamSchema, "params"), productController.deleteProduct);
//# sourceMappingURL=products.routes.js.map