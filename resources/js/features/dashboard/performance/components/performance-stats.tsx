import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import type { DateRangeOption } from '@/features/dashboard/performance/components/performance-card';
import { PerformanceCardContainer } from '@/features/dashboard/performance/components/performance-card';
import { useMockQuery } from '@/features/dashboard/performance/queries';

export default function PerformanceStats(): JSX.Element {
    const useTotalOrdersQuery = (dateRange: DateRangeOption) => useMockQuery('preformance-total-orders', 32, dateRange);
    const useCompletedOrdersQuery = (dateRange: DateRangeOption) =>
        useMockQuery('preformance-completed-orders', 24, dateRange);
    const useCancelledOrdersQuery = (dateRange: DateRangeOption) =>
        useMockQuery('preformance-cancelled-orders', 12, dateRange);
    const useCustomOrdersQuery = (dateRange: DateRangeOption) =>
        useMockQuery('preformance-custom-orders', 0, dateRange);

    const useTotalRevenueQuery = (dateRange: DateRangeOption) =>
        useMockQuery('preformance-total-revenue', 1300000, dateRange);
    const usePendingPaymentsQuery = (dateRange: DateRangeOption) =>
        useMockQuery('preformance-pending-payements', 560000, dateRange);
    const useAverageOrderValueQuery = (dateRange: DateRangeOption) =>
        useMockQuery('preformance-average-order-value', 4500, dateRange);
    const useNewUsersQuery = (dateRange: DateRangeOption) => useMockQuery('preformance-new-users', 201, dateRange);

    return (
        <div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                <PerformanceCardContainer
                    variant="secondary"
                    title="Total Orders"
                    useDataQuery={useTotalOrdersQuery}
                />

                <PerformanceCardContainer
                    title="Completed Order"
                    useDataQuery={useCompletedOrdersQuery}
                />

                <PerformanceCardContainer
                    title="Cancelled Orders"
                    useDataQuery={useCancelledOrdersQuery}
                />

                <PerformanceCardContainer
                    title="Custom Orders"
                    useDataQuery={useCustomOrdersQuery}
                />
            </div>

            <Separator className="my-8" />

            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                <PerformanceCardContainer
                    variant="secondary"
                    title="Total Revenue"
                    useDataQuery={useTotalRevenueQuery}
                    isCurrency
                />

                <PerformanceCardContainer
                    title="Pending Payment"
                    useDataQuery={usePendingPaymentsQuery}
                    isCurrency
                />

                <PerformanceCardContainer
                    title="Average Order Value"
                    useDataQuery={useAverageOrderValueQuery}
                    isCurrency
                />

                <PerformanceCardContainer
                    title="New Users"
                    useDataQuery={useNewUsersQuery}
                />
            </div>
        </div>
    );
}
