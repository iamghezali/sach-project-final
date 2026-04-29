import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';

export default function CheckoutDeliveryMode(): JSX.Element {
    const { confirmStage } = useCheckoutFlow();

    const HandleClick = () => {
        confirmStage('step-3', 'step-4');
    };

    return (
        <div>
            <Button onClick={HandleClick}>Continue</Button>
        </div>
    );
}
