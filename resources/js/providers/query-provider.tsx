import { router } from '@inertiajs/react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import type { JSX } from 'react';

const createQueryClient = () => {
    return new QueryClient({
        queryCache: new QueryCache({
            // TO REPLACE
            onError: (error) => {
                if (error.status === 404) {
                    router.visit('/not-found', { replace: true, preserveState: false });
                }
            },
        }),

        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 30,
                refetchOnWindowFocus: false,
            },
        },
    });
};

export default function QueryProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [queryClient] = useState(createQueryClient);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
