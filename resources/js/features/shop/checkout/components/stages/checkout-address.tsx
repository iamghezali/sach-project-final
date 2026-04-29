import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';

export default function CheckoutAddress(): JSX.Element {
    const { confirmStage } = useCheckoutFlow();

    const HandleClick = () => {
        confirmStage('step-2', 'step-3');
    };

    return (
        <div>
            <Button onClick={HandleClick}>Continue</Button>
        </div>
    );
}
