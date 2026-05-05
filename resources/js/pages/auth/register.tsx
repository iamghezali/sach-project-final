import type { JSX } from 'react';
import RegisterForm from '@/features/auth/components/register-form';
import ShopLayout from '@/layouts/shop-layout';

export default function Register(): JSX.Element {
    return (
        <ShopLayout>
            <section className="mt-7 flex gap-21">
                <div className="w-full grow">
                    <RegisterForm />
                </div>

                <div className="shrink-0">
                    <div className="sticky top-7">
                        <div className="relative h-213 w-170 overflow-hidden rounded-2xl bg-neutral-300"></div>
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}
