import type { ReactNode } from 'react';

interface DataGuardProps<T> {
    data: T | null | undefined;
    isLoading?: boolean;
    isError?: boolean;
    skeleton: ReactNode;
    errorFallback?: ReactNode;
    children: (data: NonNullable<T>) => ReactNode;
}

export function DataGuard<T>({ data, isLoading, isError, skeleton, errorFallback, children }: DataGuardProps<T>) {
    if (data == null) {
        if (isError) {
            return errorFallback ?? skeleton;
        }

        if (isLoading) {
            return skeleton;
        }

        return null;
    }

    return children(data);
}
