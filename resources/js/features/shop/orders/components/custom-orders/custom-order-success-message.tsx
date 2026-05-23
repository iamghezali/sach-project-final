import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';

export default function CustomOrderSuccessMessage(): JSX.Element {
    return (
        <div className="mt-7 flex flex-col items-center justify-center py-10">
            <svg
                width="165"
                height="165"
                viewBox="0 0 165 165"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M82.5 13.75C44.6875 13.75 13.75 44.6875 13.75 82.5C13.75 120.312 44.6875 151.25 82.5 151.25C120.312 151.25 151.25 120.312 151.25 82.5C151.25 44.6875 120.312 13.75 82.5 13.75ZM68.75 116.875L34.375 82.5L44.0687 72.8063L68.75 97.4187L120.931 45.2375L130.625 55L68.75 116.875Z"
                    fill="#1FC16B"
                />
            </svg>

            <h1 className="mt-8 text-7xl/tight font-bold">Your order is under review</h1>

            <Button
                className="mt-8 w-64"
                asChild
                variant="brand-primary"
                size="brand-md"
            >
                <Link href="/shop/orders/my?page=1&view=custom-orders">
                    View My Orders
                    <ArrowRight strokeWidth={3} />
                </Link>
            </Button>
        </div>
    );
}
