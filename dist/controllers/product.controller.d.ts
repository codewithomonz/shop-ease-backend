import type { Request, Response } from "express";
export declare function getAllProducts(req: Request, res: Response): Promise<void>;
export declare function getAllProductsByUserId(req: Request<{
    userId: string;
}>, res: Response): Promise<void>;
export declare function getProductById(req: Request<{
    id: string;
}>, res: Response): Promise<void>;
export declare function createProduct(req: Request, res: Response): Promise<void>;
export declare function updateProduct(req: Request<{
    id: string;
}>, res: Response): Promise<void>;
export declare function deleteProduct(req: Request<{
    id: string;
}>, res: Response): Promise<void>;
//# sourceMappingURL=product.controller.d.ts.map