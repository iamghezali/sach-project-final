import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import { useCurrentUser } from '@/features/auth/queries';

export default function WelcomeAdmin(): JSX.Element {
    const { data: userResponse, isLoading: isLoadingUser } = useCurrentUser();

    const user = userResponse?.data.user;

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
        </div>
    );
}
