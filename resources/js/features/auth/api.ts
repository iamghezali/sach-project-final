import { apiRequest } from '@/api/client';
import type { LoginRequest, RegisterRequest } from '@/features/auth/schema';
import {
    LoginResponseSchema,
    LogoutResponseSchema,
    RegisterResponseSchema,
    UserResponseSchema,
} from '@/features/auth/schema';

export const authApi = {
    login: (payload: LoginRequest, noRedirect?: boolean) =>
        apiRequest(LoginResponseSchema, {
            url: noRedirect ? '/login?noRedirect' : '/login',
            method: 'post',
            data: payload,
        }),

    register: (payload: RegisterRequest, noRedirect?: boolean) =>
        apiRequest(RegisterResponseSchema, {
            url: noRedirect ? '/register?noRedirect' : '/register',
            method: 'post',
            data: payload,
        }),

    getUser: () =>
        apiRequest(UserResponseSchema, {
            url: '/me',
            method: 'get',
        }),

    logout: () =>
        apiRequest(LogoutResponseSchema, {
            url: '/logout',
            method: 'delete',
        }),
};
