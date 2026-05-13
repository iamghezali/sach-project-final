import { z } from 'zod';
import { apiClient } from '@/api/axios';
import { ApiContractError } from '@/api/errors';
import { toFormData } from '@/api/to-form-data';

type RequestConfig = {
    url: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    data?: unknown;
    params?: unknown;
};

export async function apiRequest<T>(schema: z.ZodType<T>, config: RequestConfig): Promise<T> {
    const response = await apiClient.request({
        url: config.url,
        method: config.method ?? 'get',
        data: config.data,
        params: config.params,
    });

    if (response.status === 204) {
        return undefined as T;
    }

    if (import.meta.env.DEV) {
        const result = schema.safeParse(response.data);

        if (!result.success) {
            const issues = z.treeifyError(result.error);
            console.error('[API Contract Violation]', config.url, issues);

            throw new ApiContractError(config.url, issues);
        }

        return result.data;
    }

    return response.data as T;
}

export async function apiFormDataRequest<T>(schema: z.ZodType<T>, config: RequestConfig): Promise<T> {
    const formData = toFormData(config.data);

    const response = await apiClient.request({
        url: config.url,
        method: config.method ?? 'post',
        data: formData,
        headers: { 'Content-Type': undefined },
        params: config.params,
    });

    if (response.status === 204) {
        return undefined as T;
    }

    if (import.meta.env.DEV) {
        const result = schema.safeParse(response.data);

        if (!result.success) {
            const issues = z.treeifyError(result.error);
            console.error('[API Contract Violation]', config.url, issues);

            throw new ApiContractError(config.url, issues);
        }

        return result.data;
    }

    return response.data as T;
}
