import { apiRequest } from '@/api/client';
import { CustomersListResponseSchema } from '@/features/dashboard/users/customers/schema';

export const customersApi = {
    list: () =>
        apiRequest(CustomersListResponseSchema, {
            url: '/users/customers',
            method: 'get',
        }),
};
