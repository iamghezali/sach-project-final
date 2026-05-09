import { Link } from '@inertiajs/react';
import type { JSX } from 'react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useCurrentUser } from '@/features/auth/queries';

export default function PrimaryNavigation(): JSX.Element {
    const { data: response } = useCurrentUser();

    const isLoggedIn = !!response?.data?.user;

    return (
        <>
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
                        {isLoggedIn ? (
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                asChild
                            >
                                <Link href="/shop/orders/my">My Orders</Link>
                            </NavigationMenuLink>
                        ) : (
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                asChild
                            >
                                <Link href="/shop?category=living-rooms">Living Rooms</Link>
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Sach Collections</NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <div className="w-42">
                                <NavigationMenuLink asChild>
                                    <Link href="/shop?category=hidjab">Hidjab Collections</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/shop?category=abbaya">Abbaya Collections</Link>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}
