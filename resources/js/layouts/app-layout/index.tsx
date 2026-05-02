import type { JSX, ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/layouts/app-layout/app-sidebar';
import { SheetProvider } from '@/providers/sheet-provider';

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <SheetProvider>
                    <AppSidebar />
                    <main className="w-full p-4">{children}</main>
                </SheetProvider>
            </SidebarProvider>
        </TooltipProvider>
    );
};

export default AppLayout;
