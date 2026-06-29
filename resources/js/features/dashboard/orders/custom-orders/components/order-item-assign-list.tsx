import { router } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useAssignToTailor } from '@/features/dashboard/orders/custom-orders/mutations';
import { useTailorsList } from '@/features/dashboard/users/tailors/queries';

type OrderItemAssignListProps = {
    orderID: number;
    orderItemID: number;
};

export default function OrderItemAssignList({ orderID, orderItemID }: OrderItemAssignListProps): JSX.Element {
    const { data: response, isLoading, isError } = useTailorsList();
    const { mutateAsync: assign, isPending: isAssigning } = useAssignToTailor(orderID);

    if (isLoading) {
        return <div>Loading tailors...</div>;
    }

    if (isError || !response?.data) {
        return <div>Failed to load tailors.</div>;
    }

    const tailors = response.data;

    if (tailors.length === 0) {
        return <div>No tailors available.</div>;
    }

    const handleAssign = async (tailorEmail: string) => {
        await assign(
            {
                orderID,
                payload: { tailor_email: tailorEmail, item_id: orderItemID },
            },
            {
                onSuccess: () => {
                    router.visit(`/dashboard/custom-orders/${orderID}/item/${orderItemID}`, { replace: true });
                },
            },
        );
    };

    return (
        <ul className="flex flex-col gap-4.5">
            {tailors.map((tailor) => (
                <li key={tailor.id}>
                    <TailorCard
                        name={tailor.name}
                        email={tailor.email}
                        onAssign={() => handleAssign(tailor.email)}
                        disabled={isAssigning}
                    />
                </li>
            ))}
        </ul>
    );
}

type TailorCardProps = {
    name: string;
    email: string;
    onAssign: () => void;
    disabled: boolean;
};

const TailorCard = ({ name, email, onAssign, disabled }: TailorCardProps) => {
    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-brand-neutral-alt-500 px-5 py-4.5">
            <div className="flex items-center justify-between">
                <span className="text-sm text-brand-neutral-alt-700">{email}</span>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-[1.375rem] leading-8 font-medium">{name}</h2>

                <Button
                    variant="brand-primary"
                    size="brand-md"
                    className="w-35 font-medium"
                    onClick={onAssign}
                    disabled={disabled}
                >
                    Assign <ArrowRightIcon />
                </Button>
            </div>
        </div>
    );
};
