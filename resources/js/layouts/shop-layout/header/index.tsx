import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import logo_horizontal from '@/assets/logo-horizontal.svg';
import { Button } from '@/components/ui/button';
import PrimaryNavigation from '@/layouts/shop-layout/header/primary-navigation';

export default function ShopHeader(): JSX.Element {
    return (
        <header>
            <div className="flex h-28 items-center justify-between rounded-3xl bg-brand-shade-white px-8 py-8.5">
                <div className="flex flex-1 items-center">
                    <PrimaryNavigation />
                </div>

                <div className="shrink-0">
                    <Link href="/">
                        <img
                            className="h-22.5"
                            src={logo_horizontal}
                            alt=""
                        />
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <Button
                        variant="brand-primary"
                        size="brand-md"
                        asChild
                    >
                        <Link href="/shop/custom-order">
                            Custom Order
                            <ArrowRightIcon strokeWidth={3} />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
