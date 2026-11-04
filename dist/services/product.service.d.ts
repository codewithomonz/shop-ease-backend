import type { Paginated, Product, ProductListFilters } from "../types/products.ts";
import type { ProductInput, UpdateProductInput } from "../validators/productValidator.ts";
export declare function listProducts(filters: ProductListFilters): Promise<Paginated<Product>>;
export declare function getProduct(id: string): Promise<Product>;
export declare function createProduct(input: ProductInput, createdBy: string): Promise<Product>;
export declare function updateProduct(id: string, input: UpdateProductInput): Promise<Product>;
export declare function deleteProduct(id: string): Promise<void>;
//# sourceMappingURL=product.service.d.ts.map