import type { Order } from "../types/order.ts";
export type EmailContent = {
    subject: string;
    html: string;
    text: string;
};
export declare function welcomeEmail(name: string): EmailContent;
export declare function passwordResetEmail(name: string, resetUrl: string, expiresInMinutes: number): EmailContent;
export declare function passwordChangedEmail(name: string): EmailContent;
export declare function orderCreatedEmail(name: string, order: Order): EmailContent;
export declare function orderStatusEmail(name: string, order: Order): EmailContent;
//# sourceMappingURL=templates.d.ts.map