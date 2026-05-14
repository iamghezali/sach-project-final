import { apiRequest } from '@/api/client';
import type { CreateCategoryRequest } from '@/features/dashboard/store/categories/schema';
import {
    CategoriesListResponseSchema,
    CreateCategoryResponseSchema,
} from '@/features/dashboard/store/categories/schema';

export const categoriesApi = {
    list: () =>
        apiRequest(CategoriesListResponseSchema, {
            url: '/categories/',
            method: 'get',
        }),

    createCategory: (payload: CreateCategoryRequest) =>
        apiRequest(CreateCategoryResponseSchema, {
            url: '/categories/',
            method: 'post',
            data: payload,
        }),
};
