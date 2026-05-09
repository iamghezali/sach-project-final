import type { JSX } from 'react';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <div>
            <h1 className="text-2xl">Custom Orders</h1>
        </div>
    );
}

Listing.layout = [AppLayout];
