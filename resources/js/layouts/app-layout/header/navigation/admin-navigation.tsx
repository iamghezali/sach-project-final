import { Link } from '@inertiajs/react';
import { LogOutIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useLogout } from '@/features/auth/mutations';

function Primary(): JSX.Element {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-4.5">
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link href="/shop">Shop</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        asChild
                    >
                        <Link href="/dashboard/users/tailors">Tailors</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        asChild
                    >
                        <Link href="/dashboard/">Support</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function Secondary(): JSX.Element {
    const { mutateAsync: logout, isPending } = useLogout();

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="brand-outline"
                size="brand-md"
                className="font-normal"
                onClick={async () => await logout()}
                disabled={isPending}
            >
                <LogOutIcon />
                Logout
            </Button>
        </div>
    );
}

export const AdminNavigation = {
    Primary,
    Secondary,
};
