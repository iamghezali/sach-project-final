/**
 * Central registry of all localStorage keys used in the app.
 * Add new keys here — never use raw strings elsewhere.
 */
export const LOCAL_STORAGE_KEYS = {
    // Cart
    CART_ITEMS: 'cart_items',
} as const;

export type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];
