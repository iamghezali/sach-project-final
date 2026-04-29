import type { JSX } from 'react';
import RegisterForm from '@/features/auth/components/register-form';
import ShopLayout from '@/layouts/shop-layout';

export default function Register(): JSX.Element {
    return (
        <ShopLayout>
            <RegisterForm />
        </ShopLayout>
    );
}
