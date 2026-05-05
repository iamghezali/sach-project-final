import type { JSX } from 'react';
import { useCurrentUser } from '@/features/auth/queries';
import { CheckoutFlowProvider } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import CheckoutFlow from '@/features/shop/checkout/components/checkout-flow/checkout-flow';
import { STAGE_COMPONENTS, STAGES } from '@/features/shop/checkout/components/stages/checkout-stages-config';

export default function CheckoutStages(): JSX.Element {
    const { data: response, isLoading } = useCurrentUser();

    if (isLoading) {
        return <>Loading...</>;
    }

    const isLoggedIn = !!response?.data?.user;

    return (
        <CheckoutFlowProvider
            stages={STAGES}
            stageComponents={STAGE_COMPONENTS}
            isLoggedIn={isLoggedIn}
        >
            <CheckoutFlow />
        </CheckoutFlowProvider>
    );
}
