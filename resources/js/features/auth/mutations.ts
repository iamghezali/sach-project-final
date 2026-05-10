import { router } from '@inertiajs/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';
import { authKeys } from '@/features/auth/queries';
import type { LoginRequest, RegisterRequest } from '@/features/auth/schema';

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ payload, noRedirect }: { payload: LoginRequest; noRedirect?: boolean }) =>
            authApi.login(payload, noRedirect),

        onSuccess: (response, { noRedirect }) => {
            queryClient.setQueryData(authKeys.user(), response);

            if (!noRedirect) {
                router.visit(response.redirectTo, { replace: true });
            }
        },
    });
}

export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ payload, noRedirect }: { payload: RegisterRequest; noRedirect?: boolean }) =>
            authApi.register(payload, noRedirect),

        onSuccess: (response, { noRedirect }) => {
            queryClient.setQueryData(authKeys.user(), response);

            if (!noRedirect) {
                router.visit(response.redirectTo, { replace: true });
            }
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    const handleLogout = () => {
        queryClient.setQueryData(authKeys.user(), null);

        router.visit('/login', {
            replace: true,
            onSuccess: () => {
                queryClient.clear();
                router.clearHistory();
            },
        });
    };

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: handleLogout,
        onError: handleLogout,
    });
}
