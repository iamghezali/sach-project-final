import * as React from 'react';

import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
    return (
        <div
            data-slot="table-container"
            className="relative w-full overflow-x-auto"
        >
            <table
                data-slot="table"
                className={cn(
                    'w-full caption-bottom border-separate border-spacing-0 rounded-md border border-brand-neutral-400 text-sm',
                    className,
                )}
                {...props}
            />
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return (
        <thead
            data-slot="table-header"
            className={cn(
                'border-brand-neutral-400 [&_tr:first-child>th:first-child]:rounded-tl-md [&_tr:first-child>th:last-child]:rounded-tr-md',
                className,
            )}
            {...props}
        />
    );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot="table-body"
            className={cn(
                'border-brand-neutral-400 [&_tr:last-child>*]:border-b-0 [&_tr:last-child>td:first-child]:rounded-bl-md [&_tr:last-child>td:last-child]:rounded-br-md',
                className,
            )}
            {...props}
        />
    );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                'border-t border-brand-neutral-400 bg-muted/50 font-medium [&_tr:last-child>*]:border-b-0 [&_tr:last-child>td:first-child]:rounded-bl-md [&_tr:last-child>td:last-child]:rounded-br-md',
                className,
            )}
            {...props}
        />
    );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                'border-brand-neutral-400 transition-colors hover:bg-brand-neutral-alt-300/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted',
                className,
            )}
            {...props}
        />
    );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'min-h-10 border-r border-b border-brand-neutral-400 px-4 py-2.5 text-left align-middle font-medium whitespace-nowrap text-foreground last:border-r-0 [&:has([role=checkbox])]:pr-0',
                className,
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                'border-r border-b border-brand-neutral-400 px-4 py-2.5 align-middle whitespace-nowrap last:border-r-0 [&:has([role=checkbox])]:pr-0',
                className,
            )}
            {...props}
        />
    );
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
    return (
        <caption
            data-slot="table-caption"
            className={cn('mt-4 text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
