import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Tailor {
    id: number;
    name: string;
    completedOrders: number;
    averageProductionTime: number;
    delay: number;
}

const tailors: Tailor[] = [
    { id: 1, name: 'Aicha Berkan', completedOrders: 13, averageProductionTime: 4.5, delay: 5 },
    { id: 3, name: 'Amina Sayehar', completedOrders: 7, averageProductionTime: 5, delay: 12 },
    { id: 2, name: 'Fatima Mansouri', completedOrders: 8, averageProductionTime: 8.2, delay: 18 },
    { id: 3, name: 'Amine Slimani', completedOrders: 1, averageProductionTime: 10.3, delay: 10 },
];

export default function TailorPerformanceTable(): JSX.Element {
    return (
        <div>
            <h2 className="text-[1.625rem] leading-10 font-bold">Tailor Performance</h2>

            <div className="mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-116 text-center">Tailor</TableHead>
                            <TableHead className="w-79 text-center">Orders Completed</TableHead>
                            <TableHead className="text-center">Avg Production Time</TableHead>
                            <TableHead className="text-center">Delay %</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tailors.map((tailor) => (
                            <TableRow key={tailor.id}>
                                <TableCell className="h-15 w-1/4 text-center">{tailor.name}</TableCell>
                                <TableCell className="h-15 w-1/4 text-center">{tailor.completedOrders}</TableCell>
                                <TableCell className="h-15 w-1/4 text-center">
                                    {tailor.averageProductionTime} Days
                                </TableCell>
                                <TableCell className="h-15 w-1/4 text-center">{tailor.delay} %</TableCell>
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
