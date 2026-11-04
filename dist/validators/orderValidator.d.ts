import { z } from "zod";
export declare const shippingAddressSchema: z.ZodObject<{
    fullName: z.ZodString;
    phone: z.ZodString;
    addressLine1: z.ZodString;
    addressLine2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    country: z.ZodString;
}, z.core.$strip>;
export declare const createOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodUUID;
        quantity: z.ZodNumber;
    }, z.core.$strip>>;
    shippingAddress: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodString;
        phone: z.ZodString;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodString;
    }, z.core.$strip>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const orderQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        DELIVERED: "DELIVERED";
        PENDING: "PENDING";
        PROCESSING: "PROCESSING";
        SHIPPED: "SHIPPED";
    }>>;
}, z.core.$strip>;
export declare const updateOrderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        DELIVERED: "DELIVERED";
        PENDING: "PENDING";
        PROCESSING: "PROCESSING";
        SHIPPED: "SHIPPED";
    }>;
}, z.core.$strip>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderQuery = z.infer<typeof orderQuerySchema>;
//# sourceMappingURL=orderValidator.d.ts.map