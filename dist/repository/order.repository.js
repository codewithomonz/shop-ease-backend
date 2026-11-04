import { pool } from "../lib/db.js";
const ORDER_COLUMNS = "id, customer_id, status, total_amount, shipping_address, notes, created_at, updated_at";
function toItem(row) {
    return {
        id: row.id,
        productId: row.product_id,
        productName: row.product_name,
        unitPrice: row.unit_price,
        quantity: row.quantity,
        subtotal: row.subtotal,
    };
}
function toOrder(row, items) {
    return {
        id: row.id,
        customerId: row.customer_id,
        status: row.status,
        totalAmount: row.total_amount,
        shippingAddress: row.shipping_address,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        items,
    };
}
/** Loads items for many orders in one query (avoids N+1). */
async function attachItems(db, rows) {
    if (rows.length === 0)
        return [];
    const result = await db.query(`SELECT id, order_id, product_id, product_name, unit_price, quantity, subtotal
     FROM order_items WHERE order_id = ANY($1::uuid[])
     ORDER BY created_at`, [rows.map((r) => r.id)]);
    const byOrder = new Map();
    for (const item of result.rows) {
        const list = byOrder.get(item.order_id) ?? [];
        list.push(toItem(item));
        byOrder.set(item.order_id, list);
    }
    return rows.map((r) => toOrder(r, byOrder.get(r.id) ?? []));
}
export async function findCustomerIdByUserId(userId) {
    const result = await pool.query("SELECT id FROM customers WHERE user_id = $1", [userId]);
    return result.rows[0]?.id ?? null;
}
export async function findCustomerContact(customerId) {
    const result = await pool.query(`SELECT u.id AS user_id, u.name, u.email
     FROM customers c JOIN users u ON u.id = c.user_id
     WHERE c.id = $1`, [customerId]);
    const row = result.rows[0];
    return row ? { userId: row.user_id, name: row.name, email: row.email } : null;
}
/** Locks the products' rows until the transaction ends so stock can't be oversold. */
export async function lockProducts(client, productIds) {
    const result = await client.query(`SELECT id, name, price, stock FROM products
     WHERE id = ANY($1::uuid[])
     ORDER BY id
     FOR UPDATE`, [productIds]);
    return result.rows;
}
export async function decrementStock(client, productId, quantity) {
    await client.query("UPDATE products SET stock = stock - $1, updated_at = NOW() WHERE id = $2", [quantity, productId]);
}
export async function insertOrder(client, input) {
    const orderResult = await client.query(`INSERT INTO orders (customer_id, total_amount, shipping_address, notes)
     VALUES ($1, $2, $3, $4)
     RETURNING ${ORDER_COLUMNS}`, [input.customerId, input.totalAmount, input.shippingAddress, input.notes]);
    const order = orderResult.rows[0];
    if (!order)
        throw new Error("Failed to create order");
    const items = [];
    for (const item of input.items) {
        const res = await client.query(`INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, subtotal)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, order_id, product_id, product_name, unit_price, quantity, subtotal`, [
            order.id,
            item.productId,
            item.productName,
            item.unitPrice,
            item.quantity,
            item.subtotal,
        ]);
        items.push(toItem(res.rows[0]));
    }
    return toOrder(order, items);
}
export async function findOrders(filters) {
    const conditions = [];
    const values = [];
    if (filters.customerId) {
        values.push(filters.customerId);
        conditions.push(`customer_id = $${values.length}`);
    }
    if (filters.status) {
        values.push(filters.status);
        conditions.push(`status = $${values.length}`);
    }
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const count = await pool.query(`SELECT COUNT(*) FROM orders ${where}`, values);
    values.push(filters.limit, (filters.page - 1) * filters.limit);
    const result = await pool.query(`SELECT ${ORDER_COLUMNS} FROM orders ${where}
     ORDER BY created_at DESC
     LIMIT $${values.length - 1} OFFSET $${values.length}`, values);
    return {
        items: await attachItems(pool, result.rows),
        total: Number(count.rows[0]?.count ?? 0),
    };
}
export async function findOrderById(id, db = pool, { forUpdate = false } = {}) {
    const result = await db.query(`SELECT ${ORDER_COLUMNS} FROM orders WHERE id = $1 ${forUpdate ? "FOR UPDATE" : ""}`, [id]);
    const [order] = await attachItems(db, result.rows);
    return order ?? null;
}
export async function setOrderStatus(client, id, status) {
    await client.query("UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2", [status, id]);
}
/** Puts an order's quantities back on the shelf (skips products that were deleted). */
export async function restoreStock(client, orderId) {
    await client.query(`UPDATE products p
     SET stock = p.stock + oi.quantity, updated_at = NOW()
     FROM order_items oi
     WHERE oi.order_id = $1 AND oi.product_id = p.id`, [orderId]);
}
//# sourceMappingURL=order.repository.js.map