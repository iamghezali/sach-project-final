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

export default function PrimaryNavigation(): JSX.Element {
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
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href="/shop?category=living-rooms">Living Rooms</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Sach Collections</NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <div className="w-42">
                                <NavigationMenuLink asChild>
                                    <Link href="/shop?category=hidjab">Hidjab Collections</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink>
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
