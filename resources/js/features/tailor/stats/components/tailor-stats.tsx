import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import { useCurrentUser } from '@/features/auth/queries';
import ElipseDecoration from '@/features/tailor/stats/components/elipse-decoration';

export default function TailorStats(): JSX.Element {
    const { data: response, isLoading } = useCurrentUser();

    const user = response?.data.user;

    return (
        <div>
            <div>
                <h1 className="flex text-[2.875rem] leading-17.5 font-bold">
                    Welcome,{' '}
                    <DataGuard
                        data={user}
                        isLoading={isLoading}
                        skeleton={
                            <span className="my-3 ml-2 block h-[1em] w-40 animate-pulse rounded-xl bg-brand-neutral-200/30 leading-none"></span>
                        }
                    >
                        {(user) => <span className="ml-2">{user.name}</span>}
                    </DataGuard>
                </h1>
            </div>

            <div className="mt-8 flex gap-6">
                <div className="relative flex h-42.5 flex-1 flex-col rounded-2xl bg-[#FDDFCA] p-3 px-4 py-3">
                    <span className="block text-[1.625rem]/tight font-medium">In Queue</span>
                    <span className="z-10 mt-auto ml-auto block text-[2.875rem] leading-17.25 font-medium">02</span>

                    <ElipseDecoration className="absolute bottom-0 left-0 text-brand-primary-100" />
                </div>

                <div className="relative flex h-42.5 flex-1 flex-col rounded-2xl bg-brand-neutral-alt-100 p-3 px-4 py-3">
                    <span className="block text-[1.625rem]/tight font-medium">Orders Completed</span>
                    <span className="z-10 mt-auto ml-auto block text-[2.875rem] leading-17.25 font-medium">24</span>

                    <ElipseDecoration className="absolute bottom-0 left-0 text-brand-neutral-alt-200" />
                </div>

                <div className="relative flex h-42.5 flex-1 flex-col rounded-2xl bg-brand-neutral-alt-100 p-3 px-4 py-3">
                    <span className="block text-[1.625rem]/tight font-medium">All Time Revenue</span>
                    <span className="z-10 mt-auto ml-auto block text-[2.875rem] leading-17.25 font-medium">
                        1,250,000 DZD
                    </span>

                    <ElipseDecoration className="absolute bottom-0 left-0 text-brand-neutral-alt-200" />
                </div>
            </div>
        </div>
    );
}
