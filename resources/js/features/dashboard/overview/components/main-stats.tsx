import type { JSX } from 'react';
import { StatisticCardContainer } from '@/features/dashboard/overview/components/statistic-card';
import { useMockQuery } from '@/features/dashboard/overview/queries';

export default function MainStats(): JSX.Element {
    const usePendingReview = () => useMockQuery('overview-pending-review', 2);
    const useInProduction = () => useMockQuery('overview-in-production', 24);
    const useQualityCheck = () => useMockQuery('overview-quality-check', 12);
    const useReadyForDelivery = () => useMockQuery('overview-ready-for-delivery', 2);
    const useDeliveredToday = () => useMockQuery('overview-delivered-today', 0);

    return (
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
            <StatisticCardContainer
                variant="secondary"
                title="Pending Review"
                description="Orders waiting for admin review"
                useDataQuery={usePendingReview}
            />
            <StatisticCardContainer
                title="In Production"
                description="Orders currently with tailors"
                useDataQuery={useInProduction}
            />
            <StatisticCardContainer
                title="Quality Check"
                description="Orders returned by tailors"
                useDataQuery={useQualityCheck}
            />
            <StatisticCardContainer
                title="Ready for Delivery"
                description="Orders ready to ship"
                useDataQuery={useReadyForDelivery}
            />
            <StatisticCardContainer
                title="Delivered Today"
                description="Orders completed today"
                useDataQuery={useDeliveredToday}
            />
        </div>
    );
}
