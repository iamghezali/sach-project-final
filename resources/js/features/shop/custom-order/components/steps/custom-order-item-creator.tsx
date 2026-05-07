import type { JSX } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomOrderItemInformation from '@/features/shop/custom-order/components/steps/custom-order-item-information';
import CustomOrderItemMeasurments from '@/features/shop/custom-order/components/steps/custom-order-item-measurments';
import CustomOrderItemReview from '@/features/shop/custom-order/components/steps/custom-order-item-review';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';

export default function CustomOrderItemCreator(): JSX.Element {
    const { step } = useCustomOrder();

    return (
        <Tabs
            value={step}
            className="gap-3"
        >
            <TabsContent value="step-2">
                <h1 className="text-[2.875rem] font-bold">Create a New Item</h1>
            </TabsContent>
            <TabsContent value="step-3">
                <h1 className="text-[2.875rem] font-bold">Provide Measurement</h1>
            </TabsContent>
            <TabsContent value="step-4">
                <h1 className="text-[2.875rem] font-bold">Review Your Item</h1>
            </TabsContent>

            <TabsList className="gap-4.5 bg-transparent group-data-horizontal/tabs:h-auto group-data-horizontal/tabs:p-0">
                <TabsTrigger
                    value="step-2"
                    disabled={step !== 'step-2'}
                    className="h-1.5 w-66.25 bg-brand-neutral-alt-400 data-active:bg-brand-primary-300 group-data-[variant=default]/tabs-list:data-active:shadow-none"
                />
                <TabsTrigger
                    value="step-3"
                    disabled={step !== 'step-3'}
                    className="h-1.5 w-66.25 bg-brand-neutral-alt-400 data-active:bg-brand-primary-300 group-data-[variant=default]/tabs-list:data-active:shadow-none"
                />
                <TabsTrigger
                    value="step-4"
                    disabled={step !== 'step-4'}
                    className="h-1.5 w-66.25 bg-brand-neutral-alt-400 data-active:bg-brand-primary-300 group-data-[variant=default]/tabs-list:data-active:shadow-none"
                />
            </TabsList>

            <TabsContent value="step-2">
                <CustomOrderItemInformation />
            </TabsContent>

            <TabsContent value="step-3">
                <CustomOrderItemMeasurments />
            </TabsContent>

            <TabsContent value="step-4">
                <CustomOrderItemReview />
            </TabsContent>
        </Tabs>
    );
}
