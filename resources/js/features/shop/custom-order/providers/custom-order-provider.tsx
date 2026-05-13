import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { minimumDueDateString } from '@/features/shop/custom-order/schema';
import type { CustomOrder, CustomOrderItem } from '@/features/shop/custom-order/schema';

export type Step = 'step-1' | 'step-2' | 'step-3' | 'step-4';

type CustomOrderContextType = {
    step: Step;
    setStep: (step: Step) => void;

    orderItem: CustomOrderItem;
    setOrderItemInformation: (information: CustomOrderItem['information']) => void;
    setOrderItemMeasurements: (measurements: CustomOrderItem['measurements']) => void;
    appendOrderItemImages: (files: File[]) => void;
    removeOrderItemImage: (index: number) => void;

    customOrder: CustomOrder;
    saveOrderTitle: (title: string) => void;
    addOrUpdateOrderItem: (customOrderItem: CustomOrderItem) => void;
    removeOrderItem: (index: number) => void;

    editOrderItem: (index: number) => void;
    isEditing: boolean;
};

const CustomOrderContext = createContext<CustomOrderContextType | null>(null);

export const useCustomOrder = (): CustomOrderContextType => {
    const ctx = useContext(CustomOrderContext);

    if (!ctx) {
        throw new Error('useCustomOrder must be used within CustomOrderProvider');
    }

    return ctx;
};

type CustomOrderProviderProps = {
    children: ReactNode;
};

const ORDER_ITEM_DEFAULTS: CustomOrderItem = {
    information: {
        item_is_for: 'individual',
        item_type: 'clothing',
        item_for_gender: 'female',
        title: '',
        looking_for: '',
        provide_fabric: false,
        description: '',
        quantity: 1,
        preferred_due_date: minimumDueDateString(),
    },
    measurements: {
        measurement_type: 'standard',
        size: 'xs',
        fitting_preference: '',
    },
    images: [],
};

const CUSTOM_ORDER_DEFAULTS: CustomOrder = {
    title: '',
    items: [],
};

export const CustomOrderProvider = ({ children }: CustomOrderProviderProps) => {
    const [step, setStep] = useState<Step>('step-1');

    const [orderItem, setOrderItem] = useState<CustomOrderItem>(ORDER_ITEM_DEFAULTS);
    const [customOrder, setCustomOrder] = useState<CustomOrder>(CUSTOM_ORDER_DEFAULTS);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const isEditing = editingIndex !== null;

    const setOrderItemInformation = (information: CustomOrderItem['information']) => {
        setOrderItem((prev) => ({
            ...prev,
            information,
        }));
    };

    const setOrderItemMeasurements = (measurements: CustomOrderItem['measurements']) => {
        setOrderItem((prev) => ({
            ...prev,
            measurements,
        }));
    };

    const editOrderItem = (index: number) => {
        const item = customOrder.items?.[index];

        if (item) {
            setOrderItem(item);
            setEditingIndex(index);
            setStep('step-4');
        }
    };

    const saveOrderTitle = (title: string) => {
        setCustomOrder((prev) => ({ ...prev, title }));
    };

    const addOrUpdateOrderItem = (customOrderItem: CustomOrderItem) => {
        setCustomOrder((prev) => {
            const newItems = [...(prev.items || [])];

            if (editingIndex !== null) {
                newItems[editingIndex] = customOrderItem; // Overwrite
            } else {
                newItems.push(customOrderItem); // Create new
            }

            return { ...prev, items: newItems };
        });

        setOrderItem(ORDER_ITEM_DEFAULTS);
        setEditingIndex(null);
    };

    const removeOrderItem = (index: number) => {
        setCustomOrder((prev) => ({
            ...prev,
            items: prev.items?.filter((_, i) => i !== index) || [],
        }));
    };

    const appendOrderItemImages = (files: File[]) => {
        setOrderItem((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));
    };

    const removeOrderItemImage = (index: number) => {
        setOrderItem((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    return (
        <CustomOrderContext.Provider
            value={{
                step,
                setStep,

                orderItem,
                setOrderItemInformation,
                setOrderItemMeasurements,
                appendOrderItemImages,
                removeOrderItemImage,
                editOrderItem,
                isEditing,

                customOrder,
                saveOrderTitle,
                addOrUpdateOrderItem,
                removeOrderItem,
            }}
        >
            {children}
        </CustomOrderContext.Provider>
    );
};
