import { ChevronDownIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return (
        <AccordionPrimitive.Root
            className="flex flex-col gap-8"
            data-slot="accordion"
            {...props}
        />
    );
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            className={cn('', className)}
            data-slot="accordion-item"
            {...props}
        />
    );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                className={cn(
                    'flex h-6 flex-1 items-center justify-between gap-4 text-left text-base font-semibold text-brand-neutral-1000 uppercase transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
                    className,
                )}
                data-slot="accordion-trigger"
                {...props}
            >
                {children}
                <ChevronDownIcon
                    className="pointer-events-none size-6 shrink-0 translate-y-0.5 text-brand-neutral-1000 transition-transform duration-200"
                    strokeWidth={1.5}
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            className="data-[state=closed]:animate-accordion-up data-[state=closed]:overflow-hidden data-[state=open]:animate-accordion-down"
            data-slot="accordion-content"
            {...props}
        >
            <div className={cn('pt-4 pb-0', className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
}

export {
    Accordion as FilterAccordion,
    AccordionItem as FilterAccordionItem,
    AccordionTrigger as FilterAccordionTrigger,
    AccordionContent as FilterAccordionContent,
};
