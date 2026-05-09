import { LayoutDashboardIcon, ShoppingBasketIcon, StoreIcon, UsersRoundIcon } from 'lucide-react';
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { NavMain } from '@/layouts/app-layout/app-sidebar/nav-main';
import { NavUser } from '@/layouts/app-layout/app-sidebar/nav-user';

const menuData = {
    navMain: [
        {
            title: 'Overview',
            icon: LayoutDashboardIcon,
            isActive: true,
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard/',
                },
            ],
        },
        {
            title: 'Orders',
            icon: ShoppingBasketIcon,
            isActive: true,
            items: [
                {
                    title: 'Custom Orders',
                    url: '/dashboard/custom-orders',
                },
                {
                    title: 'Ready to Wear',
                    url: '/dashboard/orders',
                },
            ],
        },
        {
            title: 'Management',
            icon: UsersRoundIcon,
            isActive: true,
            items: [
                {
                    title: 'Customers',
                    url: '/dashboard/users/customers',
                },
                {
                    title: 'Tailors',
                    url: '/dashboard/users/tailors',
                },
                {
                    title: 'Editors',
                    url: '/dashboard/users/editors',
                },
            ],
        },
        {
            title: 'Store',
            icon: StoreIcon,
            isActive: true,
            items: [
                {
                    title: 'Products',
                    url: '/dashboard/store/products',
                },
                {
                    title: 'Attributes',
                    url: '/dashboard/store/attributes',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>Logo</SidebarHeader>
            <SidebarContent>
                <NavMain items={menuData.navMain} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
