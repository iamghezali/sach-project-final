import type { ApiError } from '@/api/errors';
import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: ApiError;
    }
}
