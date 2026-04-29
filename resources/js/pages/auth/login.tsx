import type { JSX } from 'react';
import LoginForm from '@/features/auth/components/login-form';
import ShopLayout from '@/layouts/shop-layout';

export default function Login(): JSX.Element {
    return (
        <ShopLayout>
            <LoginForm />
        </ShopLayout>
    );
}
