import * as orderService from "../services/order.service.js";
export async function createOrder(req, res) {
    const order = await orderService.placeOrder(req.user.userId, req.body);
    res.status(201).json({ success: true, data: order });
}
export async function getMyOrders(req, res) {
    const orders = await orderService.listMyOrders(req.user.userId, req.query);
    res.status(200).json({ success: true, data: orders });
}
export async function getAllOrders(req, res) {
    const orders = await orderService.listAllOrders(req.query);
    res.status(200).json({ success: true, data: orders });
}
export async function getOrderById(req, res) {
    const order = await orderService.getOrder(req.user, req.params.id);
    res.status(200).json({ success: true, data: order });
}
export async function cancelOrder(req, res) {
    const order = await orderService.cancelMyOrder(req.user.userId, req.params.id);
    res.status(200).json({ success: true, data: order });
}
export async function updateOrderStatus(req, res) {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, data: order });
}
//# sourceMappingURL=order.controller.js.map