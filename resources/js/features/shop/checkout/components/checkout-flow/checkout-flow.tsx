import type { JSX } from 'react';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import { CheckoutStage } from '@/features/shop/checkout/components/checkout-flow/checkout-stage';

export default function CheckoutFlow(): JSX.Element {
    const {
        state: { stages },
        stageComponents,
        stagesRefs,
    } = useCheckoutFlow();

    return (
        <div className="flex flex-col gap-6">
            {stages.map((stage, i) => {
                const component = stageComponents[stage.id];

                if (!component) {
                    throw new Error(`CheckoutFlow: no component registered for stage "${stage.id}".`);
                }

                return (
                    <CheckoutStage
                        ref={(e) => {
                            stagesRefs.current[i] = e;
                        }}
                        key={stage.id}
                        stage={stage}
                    >
                        {component}
                    </CheckoutStage>
                );
            })}
        </div>
    );
}
