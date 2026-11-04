import type { User } from "../types/user.ts";
import type { ChangePasswordInput, LoginInput, RegisterInput, ResetPasswordInput, UpdateProfileInput } from "../validators/authValidator.ts";
export type AuthResult = {
    user: User;
    accessToken: string;
};
export declare function register(input: RegisterInput): Promise<AuthResult>;
export declare function login(input: LoginInput): Promise<AuthResult>;
/** Logs out every session for this user by invalidating all issued tokens. */
export declare function logout(userId: string): Promise<void>;
export declare function getProfile(userId: string): Promise<User>;
export declare function updateProfile(userId: string, input: UpdateProfileInput): Promise<User>;
/** Always resolves the same way whether or not the email exists (no user enumeration). */
export declare function forgotPassword(email: string): Promise<void>;
export declare function resetPassword(input: ResetPasswordInput): Promise<void>;
export declare function changePassword(userId: string, input: ChangePasswordInput): Promise<{
    accessToken: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map