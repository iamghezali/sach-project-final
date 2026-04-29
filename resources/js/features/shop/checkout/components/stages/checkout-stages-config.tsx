import type { JSX } from 'react';
import CheckououtPersonalInformation from '@/features/shop/checkout/components/stages/checkouout-personal-information';
import CheckoutAddress from '@/features/shop/checkout/components/stages/checkout-address';
import CheckoutDeliveryMode from '@/features/shop/checkout/components/stages/checkout-delivery-mode';
import CheckoutPayment from '@/features/shop/checkout/components/stages/checkout-payment';
import CheckoutValidation from '@/features/shop/checkout/components/stages/checkout-validation';

export type StageConfig = {
    id: string;
    label: string;
    valid: boolean;
    disabled?: boolean;
    disableOnLogin?: boolean;
};

export const STAGES = [
    { id: 'step-1', label: 'Personal Info', valid: false, disableOnLogin: true },
    { id: 'step-2', label: 'Address', valid: false },
    { id: 'step-3', label: 'Delivery Mode', valid: false },
    { id: 'step-4', label: 'Payment', valid: false },
    { id: 'step-5', label: 'Validation', valid: false },
] as const satisfies StageConfig[];

export type StageID = (typeof STAGES)[number]['id'];

export const STAGE_COMPONENTS: Record<StageID, JSX.Element> = {
    'step-1': <CheckououtPersonalInformation />,
    'step-2': <CheckoutAddress />,
    'step-3': <CheckoutDeliveryMode />,
    'step-4': <CheckoutPayment />,
    'step-5': <CheckoutValidation />,
};
