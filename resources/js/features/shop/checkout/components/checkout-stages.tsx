import type { JSX } from 'react';
import { CheckoutFlowProvider } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import CheckoutFlow from '@/features/shop/checkout/components/checkout-flow/checkout-flow';
import { STAGE_COMPONENTS, STAGES } from '@/features/shop/checkout/components/stages/checkout-stages-config';

export default function CheckoutStages(): JSX.Element {
    return (
        <CheckoutFlowProvider
            stages={STAGES}
            stageComponents={STAGE_COMPONENTS}
            isLoggedIn={true}
        >
            <CheckoutFlow />
        </CheckoutFlowProvider>
    );
}
