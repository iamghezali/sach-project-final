import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import logo_horizontal_tailor from '@/assets/logo-horizontal-tailor.svg';
import logo_horizontal from '@/assets/logo-horizontal.svg';
import { AuthSwitch } from '@/layouts/shop-layout/header/auth-switch';
import { CustomerNavigation } from '@/layouts/shop-layout/header/navigation/customer-navigation';
import { GuestNavigation } from '@/layouts/shop-layout/header/navigation/guest-navigation';
import { TailorNavigation } from '@/layouts/shop-layout/header/navigation/tailor-navigation';

export default function ShopHeader(): JSX.Element {
    return (
        <header className="relative z-50">
            <div className="flex h-28 items-center justify-between rounded-3xl bg-brand-shade-white px-8 py-8.5">
                <div className="flex flex-1 items-center">
                    <AuthSwitch
                        guest={<GuestNavigation.Primary />}
                        customer={() => <CustomerNavigation.Primary />}
                        tailor={() => <TailorNavigation.Primary />}
                    />
                </div>

                <div className="shrink-0">
                    <AuthSwitch
                        loading={
                            <img
                                src={logo_horizontal}
                                className="h-22.5"
                            />
                        }
                        guest={
                            <Link href="/">
                                <img
                                    src={logo_horizontal}
                                    className="h-22.5"
                                />
                            </Link>
                        }
                        customer={() => (
                            <Link href="/">
                                <img
                                    src={logo_horizontal}
                                    className="h-22.5"
                                />
                            </Link>
                        )}
                        tailor={() => (
                            <Link href="/tailor">
                                <img
                                    src={logo_horizontal_tailor}
                                    className="h-22.5"
                                />
                            </Link>
                        )}
                    />
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <AuthSwitch
                        guest={<GuestNavigation.Secondary />}
                        customer={() => <CustomerNavigation.Secondary />}
                        tailor={() => <TailorNavigation.Secondary />}
                    />
                </div>
            </div>
        </header>
    );
}
