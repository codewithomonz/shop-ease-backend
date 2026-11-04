import type { Order, OrderStatus } from "../types/order.ts";
import type { Paginated } from "../types/products.ts";
import type { AuthUser } from "../types/user.ts";
import type { CreateOrderInput, OrderQuery } from "../validators/orderValidator.ts";
export declare function placeOrder(userId: string, input: CreateOrderInput): Promise<Order>;
export declare function listMyOrders(userId: string, q: OrderQuery): Promise<Paginated<Order>>;
export declare function listAllOrders(q: OrderQuery): Promise<Paginated<Order>>;
export declare function getOrder(user: AuthUser, orderId: string): Promise<Order>;
/** Customers may cancel their own order while it is still PENDING. */
export declare function cancelMyOrder(userId: string, orderId: string): Promise<Order>;
export declare function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
//# sourceMappingURL=order.service.d.ts.map