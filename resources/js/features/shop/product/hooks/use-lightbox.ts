import { useState } from 'react';

export interface UseLightboxReturn {
    open: boolean;
    index: number;
    openAt: (index: number) => void;
    close: () => void;
}

export function useLightbox(): UseLightboxReturn {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    function openAt(i: number) {
        setIndex(i);
        setOpen(true);
    }

    function close() {
        setOpen(false);
    }

    return { open, index, openAt, close };
}
