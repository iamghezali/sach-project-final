import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { buttonVariants } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface RecentActivityCardProps {
    orderID: string;
    type: 'Ready to wear' | 'Custom Order';
}

function RecentActivityCard({ orderID, type }: RecentActivityCardProps): JSX.Element {
    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-brand-neutral-alt-500 px-5 py-4.5">
            <div className="ml-auto">
                <span>
                    <span className="text-brand-neutral-alt-700">Type: </span>
                    <span>{type}</span>
                </span>
            </div>

            <div className="flex w-full justify-between text-[1.375rem] font-medium">
                <span>Order #SASH-{orderID} submitted</span>

                <Link
                    href="/dashboard/orders/"
                    className={cn('w-61', buttonVariants({ variant: 'brand-primary', size: 'brand-md' }))}
                >
                    Open <ArrowRightIcon strokeWidth={3} />
                </Link>
            </div>
        </div>
    );
}

export default function RecentActivity(): JSX.Element {
    return (
        <div>
            <h2 className="text-[1.625rem] leading-10 font-bold">Recent Activity</h2>

            <div className="mt-4 flex flex-col gap-4">
                <RecentActivityCard
                    orderID="1042"
                    type="Ready to wear"
                />

                <RecentActivityCard
                    orderID="3032"
                    type="Ready to wear"
                />

                <RecentActivityCard
                    orderID="1504"
                    type="Ready to wear"
                />
            </div>

            <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                isActive
                            >
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
