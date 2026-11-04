import { z } from "zod";
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=common.d.ts.map