export type MailMessage = {
    to: string;
    subject: string;
    html: string;
    text: string;
};
export declare function sendMail(message: MailMessage): Promise<void>;
/** Checks the SMTP connection at startup so misconfiguration shows up early. */
export declare function verifyMailer(): Promise<void>;
//# sourceMappingURL=mailer.d.ts.map