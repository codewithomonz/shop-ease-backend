import type { Request, Response } from "express";
type IdParams = {
    id: string;
};
export declare function createOrder(req: Request, res: Response): Promise<void>;
export declare function getMyOrders(req: Request, res: Response): Promise<void>;
export declare function getAllOrders(req: Request, res: Response): Promise<void>;
export declare function getOrderById(req: Request<IdParams>, res: Response): Promise<void>;
export declare function cancelOrder(req: Request<IdParams>, res: Response): Promise<void>;
export declare function updateOrderStatus(req: Request<IdParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=order.controller.d.ts.map