import { useCurrentUser } from '@/features/auth/queries';

type BaseUser = {
    id: string;
    name: string;
    email: string;
};

export type Customer = BaseUser & { role: 'customer' };
export type Tailor = BaseUser & { role: 'tailor' };
export type Admin = BaseUser & { role: 'admin' };

type AuthState =
    | { status: 'loading' }
    | { status: 'guest' }
    | { status: 'customer'; user: Customer }
    | { status: 'tailor'; user: Tailor }
    | { status: 'admin'; user: Admin };

export function useAuthState(): AuthState {
    const { data, isLoading } = useCurrentUser();

    if (isLoading) {
        return { status: 'loading' };
    }

    if (!data) {
        return { status: 'guest' };
    }

    const user = data.data.user;

    switch (user.role) {
        case 'customer':
            return { status: 'customer', user: { ...user, role: 'customer' } };
        case 'tailor':
            return { status: 'tailor', user: { ...user, role: 'tailor' } };
        case 'admin':
            return { status: 'admin', user: { ...user, role: 'admin' } };
        default:
            return { status: 'guest' };
    }
}
