import { useCallback } from 'react';

const STORAGE_KEY = 'order_success';
const TTL_MS = 15_000;

export const SUCCESS_TYPES = ['order', 'custom-order'] as const;
export type SuccessType = (typeof SUCCESS_TYPES)[number];

export function useSuccessMessage() {
    const setSuccessMessage = useCallback((type: SuccessType) => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ createdAt: Date.now(), type }));
    }, []);

    const getSuccessMessage = useCallback((): SuccessType | false => {
        const hasParam = new URLSearchParams(window.location.search).has('success');
        const raw = sessionStorage.getItem(STORAGE_KEY);

        sessionStorage.removeItem(STORAGE_KEY);

        if (!hasParam || !raw) {
            return false;
        }

        try {
            const { createdAt, type } = JSON.parse(raw) as { createdAt: number; type: string };
            const isValid = (SUCCESS_TYPES as readonly string[]).includes(type);

            return Date.now() - createdAt <= TTL_MS && isValid ? (type as SuccessType) : false;
        } catch {
            return false;
        }
    }, []);

    return { setSuccessMessage, getSuccessMessage };
}
