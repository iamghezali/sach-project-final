import { useCallback } from 'react';

const STORAGE_KEY = 'order_success';
const TTL_MS = 15_000;

export function useSuccessMessage() {
    const setSuccessMessage = useCallback(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ createdAt: Date.now() }));
    }, []);

    const getSuccessMessage = useCallback((): boolean => {
        const hasParam = new URLSearchParams(window.location.search).has('success');
        const raw = sessionStorage.getItem(STORAGE_KEY);

        sessionStorage.removeItem(STORAGE_KEY);

        if (!hasParam || !raw) {
            return false;
        }

        try {
            const { createdAt } = JSON.parse(raw) as { createdAt: number };

            return Date.now() - createdAt <= TTL_MS;
        } catch {
            return false;
        }
    }, []);

    return { setSuccessMessage, getSuccessMessage };
}
