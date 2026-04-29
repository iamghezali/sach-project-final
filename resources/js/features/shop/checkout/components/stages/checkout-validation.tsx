import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';

export default function CheckoutValidation(): JSX.Element {
    const { checkoutData } = useCheckoutFlow();

    return (
        <div>
            <Button
                onClick={() => {
                    console.log('checkout-data', checkoutData);
                }}
            >
                Validate & Ship
            </Button>
        </div>
    );
}
