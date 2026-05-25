import type { JSX } from 'react';
import login_image from '@/assets/login.png';
import Image from '@/components/image';
import LoginForm from '@/features/auth/components/login-form';
import ShopLayout from '@/layouts/shop-layout';

export default function Login(): JSX.Element {
    return (
        <ShopLayout>
            <section className="mt-7 flex gap-21">
                <div className="w-full grow">
                    <LoginForm />
                </div>

                <div className="shrink-0">
                    <div className="sticky top-7">
                        <div className="relative h-138 w-170 overflow-hidden rounded-2xl bg-neutral-300">
                            <Image
                                src={login_image}
                                className="absolute inset-0 size-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}
