import type { JSX, ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/layouts/app-layout/app-sidebar';
import AppHeader from '@/layouts/app-layout/header';
import { SheetProvider } from '@/providers/sheet-provider';

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <div className="bg-brand-neutral-100">
            <TooltipProvider>
                <SidebarProvider>
                    <SheetProvider>
                        <AppSidebar />
                        <main className="w-full px-6 pt-8">
                            <AppHeader />
                            <div className="mt-8">{children}</div>
                        </main>
                    </SheetProvider>
                </SidebarProvider>
            </TooltipProvider>
            <Toaster />
        </div>
    );
};

export default AppLayout;
