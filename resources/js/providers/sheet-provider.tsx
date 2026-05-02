import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type SheetStateValue = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAnimationEnd: () => void;
};

type SheetAPI = {
    openSheet: (node: React.ReactNode) => void;
    closeSheet: () => void;
};

const SheetAPIContext = createContext<SheetAPI | null>(null);
const SheetStateContext = createContext<SheetStateValue | null>(null);

function SheetStateProvider({ children, value }: { children: React.ReactNode; value: SheetStateValue }) {
    return <SheetStateContext.Provider value={value}>{children}</SheetStateContext.Provider>;
}

export function SheetProvider({ children }: { children: React.ReactNode }) {
    const [content, setContent] = useState<React.ReactNode>(null);
    const [open, setOpen] = useState(false);

    const isOpenRef = useRef(false);
    const pendingRenderRef = useRef<React.ReactNode>(null);

    useEffect(() => {
        isOpenRef.current = open;
    }, [open]);

    const openSheet = useCallback((node: React.ReactNode) => {
        if (isOpenRef.current) {
            pendingRenderRef.current = node;
            setOpen(false);
        } else {
            setContent(node);
            setOpen(true);
        }
    }, []);

    const closeSheet = useCallback(() => {
        pendingRenderRef.current = null;
        setOpen(false);
    }, []);

    const handleOpenChange = useCallback((o: boolean) => {
        if (!o) {
            pendingRenderRef.current = null;
            setOpen(false);
        }
    }, []);

    const handleAnimationEnd = useCallback(() => {
        if (!isOpenRef.current) {
            if (pendingRenderRef.current) {
                setContent(pendingRenderRef.current);
                pendingRenderRef.current = null;
                setOpen(true);
            } else {
                setContent(null);
            }
        }
    }, []);

    const apiValue = useMemo(() => ({ openSheet, closeSheet }), [openSheet, closeSheet]);

    const stateValue = useMemo(
        () => ({
            open,
            onOpenChange: handleOpenChange,
            onAnimationEnd: handleAnimationEnd,
        }),
        [open, handleOpenChange, handleAnimationEnd],
    );

    return (
        <SheetAPIContext.Provider value={apiValue}>
            {children}
            {content && <SheetStateProvider value={stateValue}>{content}</SheetStateProvider>}
        </SheetAPIContext.Provider>
    );
}

export const useSheet = () => {
    const ctx = useContext(SheetAPIContext);

    if (!ctx) {
        throw new Error('useSheet must be used within SheetProvider');
    }

    return ctx;
};

export const useSheetState = () => {
    const ctx = useContext(SheetStateContext);

    if (!ctx) {
        throw new Error('useSheetState must be inside a component rendered via openSheet');
    }

    return ctx;
};
