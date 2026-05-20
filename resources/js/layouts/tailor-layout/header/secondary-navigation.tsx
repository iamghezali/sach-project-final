import { LogOutIcon, UserIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useLogout } from '@/features/auth/mutations';

export default function SecondaryNavigation(): JSX.Element {
    const { mutateAsync: logout, isPending } = useLogout();

    return (
        <div className="flex items-center gap-4">
            <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-4">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger hideCheveron>
                            <UserIcon />
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="right-0 left-auto">
                            <div className="w-42">
                                <NavigationMenuItem asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex h-auto w-full items-center justify-start gap-2 rounded-lg p-2 text-sm font-normal transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4"
                                        onClick={async () => await logout()}
                                        disabled={isPending}
                                    >
                                        <LogOutIcon />
                                        Logout
                                    </Button>
                                </NavigationMenuItem>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Button
                variant="brand-outline"
                size="brand-md"
                className="font-normal"
            >
                <LogOutIcon />
                Logout
            </Button>
        </div>
    );
}
