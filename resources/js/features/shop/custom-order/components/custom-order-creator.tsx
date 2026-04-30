import type { JSX } from 'react';
import CustomOrderFolder from '@/features/shop/custom-order/components/steps/custom-order-folder';
import CustomOrderItemCreator from '@/features/shop/custom-order/components/steps/custom-order-item-creator';
import type { Step } from '@/features/shop/custom-order/providers/custom-order-provider';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';

export default function CustomOrderCreator(): JSX.Element {
    const { step } = useCustomOrder();
    const STEPS: Step[] = ['step-1', 'step-2', 'step-3', 'step-4'];

    return (
        <div>
            {step === 'step-1' ? <CustomOrderFolder /> : STEPS.includes(step) ? <CustomOrderItemCreator /> : null}
        </div>
    );
}
