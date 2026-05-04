import type { JSX, ReactNode } from 'react';
import ShopFooter from '@/layouts/shop-layout/footer';
import ShopHeader from '@/layouts/shop-layout/header';

type ShopLayoutProps = {
    children: ReactNode;
};

export default function ShopLayout({ children }: ShopLayoutProps): JSX.Element {
    return (
        <div className="px-4">
            <div className="mx-auto max-w-330 px-4 pt-8">
                <ShopHeader />
                <main>{children}</main>
                <ShopFooter />
            </div>
        </div>
    );
}
