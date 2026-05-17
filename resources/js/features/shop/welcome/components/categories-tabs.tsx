import { Tabs as TabsPrimitive } from 'radix-ui';
import * as React from 'react';

function Tabs({ ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            className="group/tabs flex flex-col gap-8"
            data-slot="tabs"
            data-orientation="horizontal"
            orientation="horizontal"
            {...props}
        />
    );
}

function TabsList({ ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            className="flex gap-4 rounded-full border border-brand-neutral-1000 p-4"
            data-slot="tabs-list"
            {...props}
        />
    );
}

function TabsTrigger({ ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            className="basis-full cursor-pointer rounded-full bg-brand-primary-200/20 px-4 py-4 text-center text-[1.75rem]/tight font-semibold text-brand-neutral-1000 transition-all hover:bg-brand-primary-200/25 data-[state=active]:bg-brand-primary-200"
            data-slot="tabs-trigger"
            {...props}
        />
    );
}

function TabsContent({ ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            className="flex-1 outline-none"
            data-slot="tabs-content"
            {...props}
        />
    );
}

export {
    Tabs as CategoriesTabs,
    TabsList as CategoriesTabsList,
    TabsTrigger as CategoriesTabsTrigger,
    TabsContent as CategoriesTabsContent,
};
