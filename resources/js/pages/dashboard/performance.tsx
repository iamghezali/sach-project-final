import type { JSX } from 'react';
import PerformanceStats from '@/features/dashboard/performance/components/performance-stats';
import AppLayout from '@/layouts/app-layout';

export default function Performance(): JSX.Element {
    return (
        <>
            <section>
                <PerformanceStats />
            </section>
        </>
    );
}

Performance.layout = [AppLayout];
