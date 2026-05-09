import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import logo_horizontal from '@/assets/logo-horizontal.svg';
import PrimaryNavigation from '@/layouts/shop-layout/header/primary-navigation';
import SecondaryNavigation from '@/layouts/shop-layout/header/secondary-navigation';

export default function ShopHeader(): JSX.Element {
    return (
        <header className="relative z-50">
            <div className="flex h-28 items-center justify-between rounded-3xl bg-brand-shade-white px-8 py-8.5">
                <div className="flex flex-1 items-center">
                    <PrimaryNavigation />
                </div>

                <div className="shrink-0">
                    <Link href="/">
                        <img
                            className="h-22.5"
                            src={logo_horizontal}
                            alt="Logo Sach Horizontal variant"
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
