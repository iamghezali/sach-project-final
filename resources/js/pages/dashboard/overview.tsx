import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import MainStats from '@/features/dashboard/overview/components/main-stats';
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
        </>
    );
}

Overview.layout = [AppLayout];
