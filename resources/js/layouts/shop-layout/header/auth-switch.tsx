import type { ReactNode } from 'react';
import { useAuthState } from '@/layouts/shop-layout/header/hooks/use-auth-state';
import type { Admin, Customer, Tailor } from '@/layouts/shop-layout/header/hooks/use-auth-state';

type Props = {
    loading?: ReactNode;
    guest: ReactNode;
    customer: (user: Customer) => ReactNode;
    tailor: (user: Tailor) => ReactNode;
    admin: (user: Admin) => ReactNode;
};

export function AuthSwitch({ loading = null, guest, customer, tailor, admin }: Props) {
    const state = useAuthState();

    switch (state.status) {
        case 'loading':
            return loading;
        case 'guest':
            return guest;
        case 'customer':
            return customer(state.user);
        case 'tailor':
            return tailor(state.user);
        case 'admin':
            return admin(state.user);
    }
}
