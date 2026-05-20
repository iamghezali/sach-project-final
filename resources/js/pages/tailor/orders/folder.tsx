import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import FolderItems from '@/features/tailor/orders/components/folder-items';
import TailorLayout from '@/layouts/tailor-layout';

export default function Folder(): JSX.Element {
    const { id } = usePage<{ id: number }>().props;

    return (
        <TailorLayout>
            <section>
                <div className="mt-8">
                    <FolderItems orderID={id} />
                </div>
            </section>
        </TailorLayout>
    );
}
