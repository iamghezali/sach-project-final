import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import logo_horizontal_tailor from '@/assets/logo-horizontal-tailor.svg';
import PrimaryNavigation from '@/layouts/tailor-layout/header/primary-navigation';
import SecondaryNavigation from '@/layouts/tailor-layout/header/secondary-navigation';

export default function TailorHeader(): JSX.Element {
    return (
        <header className="relative z-50">
            <div className="flex h-28 items-center justify-between rounded-3xl bg-brand-shade-white px-8 py-8.5">
                <div className="flex flex-1 items-center">
                    <PrimaryNavigation />
                </div>

                <div className="shrink-0">
                    <Link href="/tailor">
                        <img
                            className="h-22.5"
                            src={logo_horizontal_tailor}
                            alt="Logo Sach"
                        />
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <SecondaryNavigation />
                </div>
            </div>
        </header>
    );
}
