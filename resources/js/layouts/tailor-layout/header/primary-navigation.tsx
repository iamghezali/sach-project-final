import { Link } from '@inertiajs/react';
import type { JSX } from 'react';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
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
                            className={navigationMenuTriggerStyle()}
                            asChild
                        >
                            <Link href="/tailor">Orders</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            asChild
                        >
                            <Link href="/contact">Support</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}
