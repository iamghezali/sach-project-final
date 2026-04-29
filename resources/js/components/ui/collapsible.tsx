import { cn } from '@/lib/utils';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { useEffect, useState } from 'react';

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
    return (
        <CollapsiblePrimitive.Root
            data-slot="collapsible"
            {...props}
        />
    );
}

function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            data-slot="collapsible-trigger"
            {...props}
        />
    );
}

function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <CollapsiblePrimitive.CollapsibleContent
            className={cn(mounted && 'data-open:animate-collapsible-down data-closed:animate-collapsible-up')}
            data-slot="collapsible-content"
            {...props}
        />
    );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
