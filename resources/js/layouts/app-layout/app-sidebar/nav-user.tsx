import { GlobeIcon, LogOut } from 'lucide-react';
import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import { TextSkeleton } from '@/components/skeleton/text-skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useLogout } from '@/features/auth/mutations';
import { useCurrentUser } from '@/features/auth/queries';
import { getInitials } from '@/lib/get-initials';

export function NavUser(): JSX.Element {
    const { isMobile } = useSidebar();
    const { mutateAsync: logout } = useLogout();
    const { data: response, isLoading } = useCurrentUser();

    const user = response?.data.user;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg">
                            <Avatar className="h-8 w-8">
                                <DataGuard
                                    data={user}
                                    isLoading={isLoading}
                                    skeleton={<Skeleton className="size-full rounded-full" />}
                                >
                                    {(user) => (
                                        <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                                    )}
                                </DataGuard>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <DataGuard
                                    data={user}
                                    isLoading={isLoading}
                                    skeleton={
                                        <TextSkeleton
                                            leading="tight"
                                            className="w-5/8"
                                        />
                                    }
                                >
                                    {(user) => <span className="truncate font-medium">{user.name}</span>}
                                </DataGuard>

                                <DataGuard
                                    data={user}
                                    isLoading={isLoading}
                                    skeleton={<TextSkeleton leading="tight" />}
                                >
                                    {(user) => <span className="truncate text-xs">{user.email}</span>}
                                </DataGuard>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8">
                                    <DataGuard
                                        data={user}
                                        isLoading={isLoading}
                                        skeleton={null}
                                    >
                                        {(user) => (
                                            <AvatarFallback className="text-xs">
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        )}
                                    </DataGuard>
                                </Avatar>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <DataGuard
                                        data={user}
                                        isLoading={isLoading}
                                        skeleton={null}
                                    >
                                        {(user) => <span className="truncate font-medium">{user.name}</span>}
                                    </DataGuard>

                                    <DataGuard
                                        data={user}
                                        isLoading={isLoading}
                                        skeleton={null}
                                    >
                                        {(user) => <span className="truncate text-xs">{user.email}</span>}
                                    </DataGuard>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <a
                                    href="/"
                                    target="_blank"
                                >
                                    <GlobeIcon />
                                    sach-shop.com
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onSelect={async () => await logout()}>
                            <LogOut />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
