import type { JSX, ReactNode } from 'react';

type ShopLayoutProps = {
    children: ReactNode;
};

export default function ShopLayout({ children }: ShopLayoutProps): JSX.Element {
    return (
        <div className="mx-auto my-10 max-w-3xl px-4">
            <main>{children}</main>
        </div>
    );
}
