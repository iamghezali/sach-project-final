import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';

export default function CheckoutPayment(): JSX.Element {
    const { confirmStage } = useCheckoutFlow();

    const HandleClick = () => {
        confirmStage('step-4', 'step-5');
    };

    return (
        <div>
            <Button onClick={HandleClick}>Continue</Button>
        </div>
    );
}
