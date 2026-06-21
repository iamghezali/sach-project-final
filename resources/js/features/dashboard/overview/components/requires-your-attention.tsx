import { Link } from '@inertiajs/react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface CustomOrder {
    id: number;
    name: string;
    orderID: string;
    orderType: 'Clothes' | 'Living Room';
    customer: string;
    status: 'under-review' | 'to-negotiate';
    statusLabel: 'Under Review' | 'To Negociate';
    daysLeft: number;
    tailor: string;
}

const orders: CustomOrder[] = [
    {
        id: 1,
        name: 'Velvet Evening Gown',
        orderID: '3123',
        orderType: 'Clothes',
        customer: 'Amina Al-Mansoor',
        status: 'under-review',
        statusLabel: 'Under Review',
        daysLeft: 5,
        tailor: 'Fatima El-Amin',
    },
    {
        id: 2,
        name: 'Sectional Sofa Covers',
        orderID: '3234',
        orderType: 'Living Room',
        customer: 'Tarek Hadid',
        status: 'to-negotiate',
        statusLabel: 'To Negociate',
        daysLeft: 12,
        tailor: 'Karim Al-Farsi',
    },
    {
        id: 3,
        name: 'Bespoke Three-Piece Suit',
        orderID: '5334',
        orderType: 'Clothes',
        customer: 'Zayd Nouri',
        status: 'under-review',
        statusLabel: 'Under Review',
        daysLeft: 2,
        tailor: 'Youssef Rahal',
    },
    {
        id: 4,
        name: 'Custom Linen Drapes',
        orderID: '9493',
        orderType: 'Living Room',
        customer: 'Laila Haddad',
        status: 'to-negotiate',
        statusLabel: 'To Negociate',
        daysLeft: 8,
        tailor: 'Karim Al-Farsi',
    },
    {
        id: 5,
        name: 'Silk Blouse & Trousers',
        orderID: '3539',
        orderType: 'Clothes',
        customer: 'Mariam Al-Sabah',
        status: 'under-review',
        statusLabel: 'Under Review',
        daysLeft: 7,
        tailor: 'Fatima El-Amin',
    },
    {
        id: 6,
        name: 'Tufted Ottoman Upholstery',
        orderID: '3623',
        orderType: 'Living Room',
        customer: 'Omar Farooq',
        status: 'under-review',
        statusLabel: 'Under Review',
        daysLeft: 14,
        tailor: 'Salma Mansour',
    },
    {
        id: 7,
        name: 'Vintage Denim Jacket Repair',
        orderID: '3327',
        orderType: 'Clothes',
        customer: 'Rania Khoury',
        status: 'to-negotiate',
        statusLabel: 'To Negociate',
        daysLeft: 1,
        tailor: 'Youssef Rahal',
    },
    {
        id: 8,
        name: 'Embroidered Throw Pillows',
        orderID: '3820',
        orderType: 'Living Room',
        customer: 'Kamil Darwish',
        status: 'under-review',
        statusLabel: 'Under Review',
        daysLeft: 10,
        tailor: 'Salma Mansour',
    },
    {
        id: 9,
        name: 'Wool Winter Overcoat',
        orderID: '3139',
        orderType: 'Clothes',
        customer: 'Faris Al-Asmar',
        status: 'to-negotiate',
        statusLabel: 'To Negociate',
        daysLeft: 4,
        tailor: 'Fatima El-Amin',
    },
];

export default function RequiresYourAttention(): JSX.Element {
    return (
        <div>
            <h2 className="text-[1.625rem] leading-10 font-bold">Requires Attention</h2>

            <div className="mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-64">Name</TableHead>
                            <TableHead className="w-32 text-center">Order ID</TableHead>
                            <TableHead className="w-40 text-center">Type</TableHead>
                            <TableHead className="w-52 text-center">Customer</TableHead>
                            <TableHead className="w-40 text-center">Status</TableHead>
                            <TableHead className="w-32 text-center">Days Waiting</TableHead>
                            <TableHead className="w-52 text-center">Tailor</TableHead>
                            <TableHead className="w-30 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.name}</TableCell>
                                <TableCell className="text-center font-medium">{order.orderID}</TableCell>
                                <TableCell className="text-center">{order.orderType}</TableCell>
                                <TableCell className="text-center">{order.customer}</TableCell>
                                <TableCell className="text-center">
                                    <StatusBadge variant={order.status}>{order.statusLabel}</StatusBadge>
                                </TableCell>
                                <TableCell className="text-center">{order.daysLeft} Days</TableCell>
                                <TableCell className="text-center">{order.tailor}</TableCell>
                                <TableCell className="text-center">
                                    <Link
                                        href="/dashboard/orders/"
                                        className={cn(
                                            buttonVariants({ variant: 'brand-primary', size: 'brand-md' }),
                                            'w-full rounded-xl text-sm',
                                        )}
                                    >
                                        Review
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-5">
                <Link
                    href="/dashboard/orders"
                    className={cn(
                        buttonVariants({ variant: 'brand-outline', size: 'brand-md' }),
                        'w-50 rounded-xl text-sm',
                    )}
                >
                    View All
                    <ArrowRightIcon strokeWidth={3} />
                </Link>
            </div>
        </div>
    );
}

const badgeVariants = cva('inline-flex h-10 items-center justify-center rounded-xl border px-5.5', {
    variants: {
        variant: {
            'under-review': 'border-[#D1BF98] bg-[#FFF5D9]',
            'to-negotiate': 'border-[#98ABD1] bg-[#D9E6FF]',
        },
    },
    defaultVariants: {
        variant: 'under-review',
    },
});

const StatusBadge = ({
    variant,
    children,
    ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) => (
    <span
        data-slot="badge"
        className={cn(badgeVariants({ variant }))}
        {...props}
    >
        {children}
    </span>
);
