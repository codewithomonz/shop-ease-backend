import type pg from "pg";
import type { Role, User, UserAuthRecord } from "../types/user.ts";
type Queryable = pg.Pool | pg.PoolClient;
export declare function findUserById(id: string, db?: Queryable): Promise<User | null>;
export declare function findUserByEmail(email: string): Promise<User | null>;
export declare function findAuthRecordByEmail(email: string): Promise<UserAuthRecord | null>;
export declare function findAuthRecordById(id: string): Promise<UserAuthRecord | null>;
/** Creates a CUSTOMER user and its customer profile in one transaction (pass a tx client). */
export declare function createCustomerUser(client: pg.PoolClient, input: {
    name: string;
    email: string;
    passwordHash: string;
}): Promise<User>;
export declare function markLogin(userId: string): Promise<void>;
/** Sets a new password and bumps token_version so every existing JWT is invalidated. */
export declare function updatePassword(userId: string, passwordHash: string): Promise<UserAuthRecord>;
export declare function incrementTokenVersion(userId: string): Promise<void>;
export declare function getTokenVersion(userId: string): Promise<number | null>;
export declare function setPasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
export declare function findUserIdByValidResetToken(tokenHash: string): Promise<string | null>;
export type ProfileChanges = {
    name?: string | undefined;
    phone?: string | null | undefined;
    addressLine1?: string | null | undefined;
    addressLine2?: string | null | undefined;
    city?: string | null | undefined;
    state?: string | null | undefined;
    postalCode?: string | null | undefined;
    country?: string | null | undefined;
};
export declare function updateProfile(client: pg.PoolClient, userId: string, changes: ProfileChanges): Promise<void>;
export declare function setUserRole(email: string, role: Role): Promise<boolean>;
export {};
//# sourceMappingURL=user.repository.d.ts.map