import type { JSX, ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/layouts/app-layout/app-sidebar';
import { SheetProvider } from '@/providers/sheet-provider';

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <div className="bg-brand-neutral-100">
            <TooltipProvider>
                <SidebarProvider>
                    <SheetProvider>
                        <AppSidebar />
                        <main className="w-full p-4">{children}</main>
                    </SheetProvider>
                </SidebarProvider>
            </TooltipProvider>
            <Toaster />
        </div>
    );
};

export default AppLayout;
