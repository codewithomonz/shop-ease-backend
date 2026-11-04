import type pg from "pg";
import type { Order, OrderStatus, ShippingAddress } from "../types/order.ts";
type Queryable = pg.Pool | pg.PoolClient;
export type LockedProduct = {
    id: string;
    name: string;
    price: number;
    stock: number;
};
export declare function findCustomerIdByUserId(userId: string): Promise<string | null>;
export declare function findCustomerContact(customerId: string): Promise<{
    userId: string;
    name: string;
    email: string;
} | null>;
/** Locks the products' rows until the transaction ends so stock can't be oversold. */
export declare function lockProducts(client: pg.PoolClient, productIds: string[]): Promise<LockedProduct[]>;
export declare function decrementStock(client: pg.PoolClient, productId: string, quantity: number): Promise<void>;
export declare function insertOrder(client: pg.PoolClient, input: {
    customerId: string;
    totalAmount: number;
    shippingAddress: ShippingAddress;
    notes: string | null;
    items: Array<{
        productId: string;
        productName: string;
        unitPrice: number;
        quantity: number;
        subtotal: number;
    }>;
}): Promise<Order>;
export declare function findOrders(filters: {
    customerId?: string | undefined;
    status?: OrderStatus | undefined;
    page: number;
    limit: number;
}): Promise<{
    items: Order[];
    total: number;
}>;
export declare function findOrderById(id: string, db?: Queryable, { forUpdate }?: {
    forUpdate?: boolean | undefined;
}): Promise<Order | null>;
export declare function setOrderStatus(client: pg.PoolClient, id: string, status: OrderStatus): Promise<void>;
/** Puts an order's quantities back on the shelf (skips products that were deleted). */
export declare function restoreStock(client: pg.PoolClient, orderId: string): Promise<void>;
export {};
//# sourceMappingURL=order.repository.d.ts.map