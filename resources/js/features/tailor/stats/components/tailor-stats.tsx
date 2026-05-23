import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import { useCurrentUser } from '@/features/auth/queries';
import ElipseDecoration from '@/features/tailor/stats/components/elipse-decoration';
import { useTailorStats } from '@/features/tailor/stats/queries';
import { formatPrice } from '@/lib/format-price';

export default function TailorStats(): JSX.Element {
    const { data: userResponse, isLoading: isLoadingUser } = useCurrentUser();
    const { data: tailorStatsResponse, isLoading: isLoadingStats } = useTailorStats();

    const user = userResponse?.data.user;
    const stats = tailorStatsResponse?.data;

    return (
        <div>
            <div>
                <h1 className="flex text-[2.875rem] leading-17.5 font-bold">
                    Welcome,{' '}
                    <DataGuard
                        data={user}
                        isLoading={isLoadingUser}
                        skeleton={
                            <span className="my-3 ml-2 block h-[1em] w-52 animate-pulse rounded-xl bg-brand-neutral-200/20 leading-none"></span>
                        }
                    >
                        {(user) => <span className="ml-2">{user.name}</span>}
                    </DataGuard>
                </h1>
            </div>

            <div className="mt-8 flex gap-6">
                <div className="relative flex h-42.5 flex-1 flex-col rounded-2xl bg-[#FDDFCA] p-3 px-4 py-3">
                    <span className="block text-[1.625rem]/tight font-medium">In Queue</span>
                    <span className="z-10 mt-auto ml-auto block text-[2.875rem] leading-17.25 font-medium">
                        <DataGuard
                            data={stats}
                            isLoading={isLoadingStats}
                            skeleton={<>Loading..</>}
                        >
                            {(stats) => <span>{stats.in_queue}</span>}
                        </DataGuard>
                    </span>

                    <ElipseDecoration className="absolute bottom-0 left-0 text-brand-primary-100" />
                </div>

                <div className="relative flex h-42.5 flex-1 flex-col rounded-2xl bg-brand-neutral-alt-100 p-3 px-4 py-3">
                    <span className="block text-[1.625rem]/tight font-medium">Orders Completed</span>
                    <span className="z-10 mt-auto ml-auto block text-[2.875rem] leading-17.25 font-medium">
                        <DataGuard
                            data={stats}
                            isLoading={isLoadingStats}
                            skeleton={<>Loading..</>}
                        >
                            {(stats) => <span>{stats.completed_count}</span>}
                        </DataGuard>
                    </span>

                    <ElipseDecoration className="absolute bottom-0 left-0 text-brand-neutral-alt-200" />
                </div>

                <div className="relative flex h-42.5 flex-1 flex-col rounded-2xl bg-brand-neutral-alt-100 p-3 px-4 py-3">
                    <span className="block text-[1.625rem]/tight font-medium">All Time Revenue</span>
                    <span className="z-10 mt-auto ml-auto block text-[2.875rem] leading-17.25 font-medium">
                        <DataGuard
                            data={stats}
                            isLoading={isLoadingStats}
                            skeleton={<>Loading..</>}
                        >
                            {(stats) => <span>{formatPrice(stats.potential_earnings)} DZD</span>}
                        </DataGuard>
                    </span>

                    <ElipseDecoration className="absolute bottom-0 left-0 text-brand-neutral-alt-200" />
                </div>
            </div>
        </div>
    );
}
