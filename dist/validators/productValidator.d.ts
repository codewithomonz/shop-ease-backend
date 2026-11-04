import { z } from "zod";
export declare const productSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    stock: z.ZodNumber;
    category: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodURL>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodNumber>;
    category: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodURL>>;
}, z.core.$strip>;
export declare const productQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const userIdParamSchema: z.ZodObject<{
    userId: z.ZodUUID;
}, z.core.$strip>;
export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
//# sourceMappingURL=productValidator.d.ts.map