import axios from 'axios';
import type { z } from 'zod';

export type ApiError = {
    message: string;
    status: number;
    errors?: Record<string, string[]>; // Laravel validation errors
};

export class ApiContractError extends Error {
    constructor(
        public url: string,
        public issues: ReturnType<typeof z.treeifyError>,
    ) {
        super(`API contract violation on ${url}`);
        this.name = 'ApiContractError';
    }
}

export function normalizeAxiosError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
        return {
            message: error.response?.data?.message ?? 'Unknown error',
            status: error.response?.status ?? 0,
            errors: error.response?.data?.errors,
        };
    }

    return { message: 'Unexpected error', status: 0 };
}
