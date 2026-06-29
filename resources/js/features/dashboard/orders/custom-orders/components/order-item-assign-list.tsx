import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';

export default function OrderItemAssignList(): JSX.Element {
    return (
        <ul className="flex flex-col gap-4.5">
            {Array.from({ length: 2 }).map((_, i) => (
                <li key={i}>
                    <TailorCard />
                </li>
            ))}
        </ul>
    );
}

const TailorCard = () => {
    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-brand-neutral-alt-500 px-5 py-4.5">
            <div className="flex items-center justify-between">
                <span>
                    <span className="text-brand-neutral-alt-700">Type: </span>
                    <span>Clothes</span>
                </span>

                <span>
                    <span className="text-brand-neutral-alt-700">Location: </span>
                    <span className="font-medium">Bechar</span>
                </span>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-[1.375rem] leading-8 font-medium">Tailor Name</h2>

                <Button
                    variant="brand-primary"
                    size="brand-md"
                    className="w-35 font-medium"
                >
                    Assign <ArrowRightIcon />
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <span></span>

                <span>
                    <span className="text-brand-neutral-alt-700">Active Orders: </span>
                    <span>1</span>
                </span>
            </div>
        </div>
    );
};
