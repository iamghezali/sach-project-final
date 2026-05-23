import { Link } from '@inertiajs/react';
import { ArrowRightIcon, LogInIcon, UserIcon, UserPlusIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import CartNavItem from '@/layouts/shop-layout/header/navigation/cart-nav-item';

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
                            <NavigationMenuLink asChild>
                                <Link href="/shop?category=abbaya">Abbaya Collections</Link>
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function Secondary(): JSX.Element {
    return (
        <div className="flex items-center gap-4">
            <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-2">
                    <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <CartNavItem />
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger hideCheveron>
                            <UserIcon />
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="right-0 left-auto">
                            <div className="w-42">
                                <NavigationMenuLink asChild>
                                    <Link href="/login">
                                        <LogInIcon />
                                        Login
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/register">
                                        <UserPlusIcon />
                                        Register
                                    </Link>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Button
                variant="brand-primary"
                size="brand-md"
                asChild
            >
                <Link href="/shop/custom-order">
                    Custom Order
                    <ArrowRightIcon strokeWidth={3} />
                </Link>
            </Button>
        </div>
    );
}

export const GuestNavigation = {
    Primary,
    Secondary,
};
