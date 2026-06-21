import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import UnderDevelopmentNotice from '@/components/under-development-notice';
import PerformanceStats from '@/features/dashboard/performance/components/performance-stats';
import TailorPerformanceTable from '@/features/dashboard/performance/components/tailor-performance-table';
import AppLayout from '@/layouts/app-layout';

export default function Performance(): JSX.Element {
    return (
        <>
            <section>
                <PerformanceStats />
            </section>

            <Separator className="my-8" />

            <section>
                <TailorPerformanceTable />
            </section>

            <UnderDevelopmentNotice />
        </>
    );
}

Performance.layout = [AppLayout];
