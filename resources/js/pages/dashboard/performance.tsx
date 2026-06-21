import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
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
        </>
    );
}

Performance.layout = [AppLayout];
