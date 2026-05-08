import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import type { Dispatch, JSX, ReactNode, RefObject, SetStateAction } from 'react';

import type { CartItem } from '@/features/shop/cart/hooks/use-cart';
import { reducer } from '@/features/shop/checkout/components/checkout-flow/checkout-reducer';
import type { Action, Stage, State } from '@/features/shop/checkout/components/checkout-flow/checkout-reducer';
import type { StageID } from '@/features/shop/checkout/components/stages/checkout-stages-config';
import type { CheckoutData } from '@/features/shop/checkout/schema';

type CheckoutFlowContextType = {
    state: State;
    dispatch: Dispatch<Action>;

    stagesRefs: RefObject<(HTMLDivElement | null)[]>;
    stageComponents: Record<string, JSX.Element>;

    confirmStage: <T extends StageID>(currentID: T, nextID: Exclude<StageID, T>) => void;
    editStage: (stageID: StageID) => void;

    useSameAddress: boolean | 'indeterminate';
    setUseSameAddress: Dispatch<SetStateAction<boolean | 'indeterminate'>>;

    checkoutData: Partial<CheckoutData>;
    appendCheckoutData: (data: Partial<CheckoutData>) => void;
    prepareItemsFromCart: (cart: CartItem[]) => void;
    clearCheckoutData: () => void;
};

const CheckoutFlowContext = createContext<CheckoutFlowContextType | null>(null);

export const useCheckoutFlow = (): CheckoutFlowContextType => {
    const ctx = useContext(CheckoutFlowContext);

    if (!ctx) {
        throw new Error('useCheckoutFlow must be used within CheckoutFlow');
    }

    return ctx;
};

type CheckoutFlowProviderProps = {
    stages: Stage[];
    children: ReactNode;
    stageComponents: Record<string, JSX.Element>;
    isLoggedIn: boolean;
};

const DEFAULT_CHECKOUT_DATA: Partial<CheckoutData> = {
    shipping_address: {
        full_name: '',
        phone: '',
        address_line_1: '',
        address_line_2: '',
        willaya: '',
        postal_code: '',
        country: 'algeria',
    },
    billing_address: {
        full_name: '',
        phone: '',
        address_line_1: '',
        address_line_2: '',
        willaya: '',
        postal_code: '',
        country: 'algeria',
    },
    delivery_option: 'yalidine',
    notes: '',
    payment_option: 'cod',
    items: [],
};

export const CheckoutFlowProvider = ({ stages, isLoggedIn, stageComponents, children }: CheckoutFlowProviderProps) => {
    const stagesRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [useSameAddress, setUseSameAddress] = useState<boolean | 'indeterminate'>(true);
    const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>(DEFAULT_CHECKOUT_DATA);

    const [state, dispatch] = useReducer(reducer, {
        stages: stages.map((s) => {
            if (s.disableOnLogin && isLoggedIn) {
                return { ...s, disabled: true, valid: true };
            }

            return s.disabled ? { ...s, valid: true } : s;
        }),
        activeStageID: stages.find((s) => !(s.disabled || (s.disableOnLogin && isLoggedIn)))?.id ?? stages[0].id,
        hasReachedReview: false,
        isEditing: false,
    });

    const scrollToStage = useCallback(
        (stageId: StageID) => {
            const index = state.stages.findIndex((s) => s.id === stageId);
            stagesRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
        },
        [state.stages],
    );

    const confirmStage = <T extends StageID>(currentID: T, nextID: Exclude<StageID, T>) => {
        scrollToStage(currentID);

        setTimeout(() => {
            dispatch({
                type: 'CONFIRM_STAGE',
                payload: { currentID, nextID },
            });
        }, 500);
    };

    const editStage = (stageID: StageID) => {
        scrollToStage(stageID);

        setTimeout(() => {
            dispatch({
                type: 'EDIT_STAGE',
                payload: { stageID },
            });
        }, 500);
    };

    const appendCheckoutData = useCallback((data: Partial<CheckoutData>) => {
        setCheckoutData((prev) => ({ ...prev, ...data }));
    }, []);

    const prepareItemsFromCart = useCallback(
        (cart: CartItem[]) => {
            const items: CheckoutData['items'] = cart
                .filter(
                    (item): item is typeof item & { variant: NonNullable<typeof item.variant> } =>
                        item.variant !== undefined && item.variant !== null,
                )
                .map((item) => ({
                    product_variant_id: item.variant.id,
                    quantity: item.quantity,
                }));

            appendCheckoutData({ items });
        },
        [appendCheckoutData],
    );

    const clearCheckoutData = () => {
        setCheckoutData(DEFAULT_CHECKOUT_DATA);
    };

    useEffect(() => {
        dispatch({
            type: 'SYNC_LOGIN_STATE',
            isLoggedIn,
        });

        if (isLoggedIn) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isLoggedIn]);

    return (
        <CheckoutFlowContext.Provider
            value={{
                state,
                dispatch,

                stagesRefs,
                stageComponents,
                confirmStage,
                editStage,

                useSameAddress,
                setUseSameAddress,

                checkoutData,
                appendCheckoutData,
                prepareItemsFromCart,
                clearCheckoutData,
            }}
        >
            {children}
        </CheckoutFlowContext.Provider>
    );
};
