import type { JSX, ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/layouts/app-layout/app-sidebar';

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full p-4">{children}</main>
            </SidebarProvider>
        </TooltipProvider>
    );
};

export default AppLayout;
