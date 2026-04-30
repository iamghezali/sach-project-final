import type { JSX } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomOrderItemInformation from '@/features/shop/custom-order/components/steps/custom-order-item-information';
import CustomOrderItemMeasurments from '@/features/shop/custom-order/components/steps/custom-order-item-measurments';
import CustomOrderItemReview from '@/features/shop/custom-order/components/steps/custom-order-item-review';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';

export default function CustomOrderItemCreator(): JSX.Element {
    const { step } = useCustomOrder();

    return (
        <>
            <div>Item Creator</div>
            <Tabs value={step}>
                <TabsContent value="step-2">
                    <h1 className="text-2xl">Item Information</h1>
                </TabsContent>
                <TabsContent value="step-3">
                    <h1 className="text-2xl">Item Measurements</h1>
                </TabsContent>
                <TabsContent value="step-4">
                    <h1 className="text-2xl">Item Review</h1>
                </TabsContent>

                <TabsList className="gap-2 bg-transparent group-data-horizontal/tabs:h-auto group-data-horizontal/tabs:p-0">
                    <TabsTrigger
                        value="step-2"
                        disabled={step !== 'step-2'}
                        className="h-2 w-40 bg-muted data-active:bg-primary group-data-[variant=default]/tabs-list:data-active:shadow-none"
                    />
                    <TabsTrigger
                        value="step-3"
                        disabled={step !== 'step-3'}
                        className="h-2 w-40 bg-muted data-active:bg-primary group-data-[variant=default]/tabs-list:data-active:shadow-none"
                    />
                    <TabsTrigger
                        value="step-4"
                        disabled={step !== 'step-4'}
                        className="h-2 w-40 bg-muted data-active:bg-primary group-data-[variant=default]/tabs-list:data-active:shadow-none"
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
        </>
    );
}
