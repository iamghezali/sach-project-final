import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import MainStats from '@/features/dashboard/overview/components/main-stats';
import RecentActivity from '@/features/dashboard/overview/components/recent-activity';
import RequiresYourAttention from '@/features/dashboard/overview/components/requires-your-attention';
import TailorsWorkloadTable from '@/features/dashboard/overview/components/tailors-workload-table';
import WelcomeAdmin from '@/features/dashboard/overview/components/welcome-admin';
import AppLayout from '@/layouts/app-layout';

export default function Overview(): JSX.Element {
    return (
        <>
            <WelcomeAdmin />

            <section className="mt-6">
                <MainStats />
            </section>

            <Separator className="my-6" />

            <section>
                <RequiresYourAttention />
            </section>

            <Separator className="mt-10 mb-8" />

            <section>
                <RecentActivity />
            </section>

            <Separator className="my-8" />

            <section>
                <TailorsWorkloadTable />
            </section>
        </>
    );
}

Overview.layout = [AppLayout];
