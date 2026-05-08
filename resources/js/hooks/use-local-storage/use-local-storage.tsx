import { useCallback, useEffect, useRef, useState } from 'react';
import type { LocalStorageKey } from '@/hooks/use-local-storage/local-stoage-keys';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

function readFromStorage<T>(key: LocalStorageKey, initialValue: T): T {
    try {
        const item = window.localStorage.getItem(key);

        return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
        console.warn(`[useLocalStorage] Failed to read key "${key}":`, error);

        return initialValue;
    }
}

/**
 * A type-safe localStorage hook that only accepts keys from the central registry.
 *
 * @param key     - A key from LOCAL_STORAGE_KEYS
 * @param initialValue - Fallback value when the key is absent or unreadable
 *
 * @example
 * const [theme, setTheme] = useLocalStorage(LOCAL_STORAGE_KEYS.THEME, "light");
 */
export function useLocalStorage<T>(
    key: LocalStorageKey,
    initialValue: T,
): {
    value: T;
    setValue: SetValue<T>;
    removeValue: () => void;
    isHydrated: boolean;
} {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const initialValueRef = useRef(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        initialValueRef.current = initialValue;
    });

    useEffect(() => {
        setStoredValue(readFromStorage(key, initialValueRef.current));
        setIsHydrated(true);
    }, [key]);

    // Keep state in sync when the same key is mutated from another tab / component
    useEffect(() => {
        function onStorageEvent(e: StorageEvent) {
            if (e.key !== key) {
                return;
            }

            setStoredValue(e.newValue !== null ? (JSON.parse(e.newValue) as T) : initialValue);
        }

        window.addEventListener('storage', onStorageEvent);

        return () => window.removeEventListener('storage', onStorageEvent);
    }, [key, initialValue]);

    const setValue: SetValue<T> = useCallback(
        (value) => {
            try {
                const next = value instanceof Function ? value(storedValue) : value;
                const serialized = JSON.stringify(next);
                window.localStorage.setItem(key, JSON.stringify(next));
                window.dispatchEvent(new StorageEvent('storage', { key, newValue: serialized }));
                setStoredValue(next);
            } catch (error) {
                console.warn(`[useLocalStorage] Failed to write key "${key}":`, error);
            }
        },
        [key, storedValue],
    );

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.warn(`[useLocalStorage] Failed to remove key "${key}":`, error);
        }
    }, [key, initialValue]);

    return { value: storedValue, setValue, removeValue, isHydrated };
}
