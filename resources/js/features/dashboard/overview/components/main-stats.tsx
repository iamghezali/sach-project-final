import type { JSX } from 'react';
import StatisticCard from '@/features/dashboard/overview/components/statistic-card';

export default function MainStats(): JSX.Element {
    return (
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
            <StatisticCard
                variant="secondary"
                title="Pending Review"
                description="Orders waiting for admin review"
                count={2}
            />
            <StatisticCard
                title="In Production"
                description="Orders currently with tailors"
                count={24}
            />
            <StatisticCard
                title="Quality Check"
                description="Orders returned by tailors"
                count={12}
            />
            <StatisticCard
                title="Ready for Delivery"
                description="Orders ready to ship"
                count={3}
            />
            <StatisticCard
                title="Delivered Today"
                description="Orders completed today"
                count={0}
            />
        </div>
    );
}
