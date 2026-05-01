import axios from 'axios';
import { normalizeAxiosError } from '@/api/errors';

export const apiClient = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Normalize before it hits error handlers
        return Promise.reject(normalizeAxiosError(error));
    },
);
