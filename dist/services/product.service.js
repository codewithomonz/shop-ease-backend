import { AppError } from "../errors/AppError.js";
import { createDatabaseProduct, deleteDatabaseProduct, fetchProducts, findProductById, updateDatabaseProduct, } from "../repository/product.repository.js";
export async function listProducts(filters) {
    const { items, total } = await fetchProducts(filters);
    return {
        items,
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit),
    };
}
export async function getProduct(id) {
    const product = await findProductById(id);
    if (!product)
        throw new AppError(404, "Product not found");
    return product;
}
export async function createProduct(input, createdBy) {
    return createDatabaseProduct(input, createdBy);
}
export async function updateProduct(id, input) {
    const product = await updateDatabaseProduct(id, input);
    if (!product)
        throw new AppError(404, "Product not found");
    return product;
}
export async function deleteProduct(id) {
    const deleted = await deleteDatabaseProduct(id);
    if (!deleted)
        throw new AppError(404, "Product not found");
}
//# sourceMappingURL=product.service.js.map