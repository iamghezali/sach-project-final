import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import logo_horizontal_admin from '@/assets/logo-horizontal-admin.svg';
import { AdminNavigation } from '@/layouts/app-layout/header/navigation/admin-navigation';

export default function AppHeader(): JSX.Element {
    return (
        <header className="relative z-50 w-full">
            <div className="flex h-28 items-center justify-between rounded-3xl bg-brand-shade-white px-8 py-8.5">
                <div className="flex flex-1 items-center">
                    <AdminNavigation.Primary />
                </div>

                <div className="shrink-0">
                    <Link href="/dashboard">
                        <img
                            src={logo_horizontal_admin}
                            className="h-22.5"
                        />
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <AdminNavigation.Secondary />
                </div>
            </div>
        </header>
    );
}
