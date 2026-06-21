import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Tailor {
    id: number;
    name: string;
    activeOrders: number;
}

const tailors: Tailor[] = [
    { id: 1, name: 'Aicha Berkan', activeOrders: 2 },
    { id: 2, name: 'Fatima Mansouri', activeOrders: 5 },
    { id: 3, name: 'Amine Slimani', activeOrders: 3 },
];

export default function TailorsWorkloadTable(): JSX.Element {
    return (
        <div>
            <h2 className="text-[1.625rem] leading-10 font-bold">Recent Activity</h2>

            <div className="mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-116 text-center">Tailor</TableHead>
                            <TableHead className="w-79 text-center">Active Orders</TableHead>
                            <TableHead className="text-center">Profile</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tailors.map((tailor) => (
                            <TableRow key={tailor.id}>
                                <TableCell className="text-center">{tailor.name}</TableCell>
                                <TableCell className="text-center">{tailor.activeOrders}</TableCell>
                                <TableCell className="text-center">
                                    <Link
                                        href="/dashboard/users/tailors"
                                        className={cn(
                                            buttonVariants({ variant: 'brand-primary', size: 'brand-md' }),
                                            'w-full rounded-xl text-sm',
                                        )}
                                    >
                                        View Profile
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-5">
                <Link
                    href="/dashboard/users/tailors"
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
