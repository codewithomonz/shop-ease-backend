import type { Product, ProductListFilters } from "../types/products.ts";
import type { ProductInput, UpdateProductInput } from "../validators/productValidator.ts";
export declare function fetchProducts(filters: ProductListFilters): Promise<{
    items: Product[];
    total: number;
}>;
export declare function findProductById(id: string): Promise<Product | null>;
export declare function createDatabaseProduct(product: ProductInput, createdBy: string | null): Promise<Product>;
export declare function updateDatabaseProduct(id: string, changes: UpdateProductInput): Promise<Product | null>;
export declare function deleteDatabaseProduct(id: string): Promise<boolean>;
//# sourceMappingURL=product.repository.d.ts.map