import type { VariantProps } from 'class-variance-authority';
import {
    ArchiveIcon,
    ArchiveRestoreIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    FileTextIcon,
    GlobeIcon,
    Trash2Icon,
} from 'lucide-react';
import type { JSX } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { buttonVariants } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChangeProductStatus } from '@/features/dashboard/store/products/mutations';
import { useProductDetails } from '@/features/dashboard/store/products/queries';
import type { ProductStatus } from '@/features/dashboard/store/products/schema';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

interface ChangeProductStatusProps {
    productID: number;
}

// What the trigger button displays — reflects current state, not an action.
const STATUS_CONFIG: Record<
    ProductStatus,
    {
        label: string;
        icon: React.ElementType;
        variant: ButtonVariant;
    }
> = {
    draft: { label: 'Draft', icon: FileTextIcon, variant: 'brand-outline' },
    published: { label: 'Published', icon: GlobeIcon, variant: 'brand-outline' },
    archived: { label: 'Archived', icon: ArchiveIcon, variant: 'brand-outline' },
};

export default function ChangeProductStatus({ productID }: ChangeProductStatusProps): JSX.Element {
    const { data: response } = useProductDetails(productID);
    const { mutateAsync: changeProductStatus, isPending } = useChangeProductStatus();

    if (!response) {
        return <></>;
    }

    const status = response.data.status;
    const product = response.data;

    const { label, icon: Icon, variant } = STATUS_CONFIG[status];

    async function handleStatusChange(newStatus: ProductStatus) {
        await changeProductStatus(
            {
                id: productID,
                payload: { status: newStatus },
            },
            {
                onError: (errors) => toast.error(errors.message, { position: 'bottom-right' }),
            },
        );
    }

    function handleDelete() {
        console.log(`product ${productID}: deleting`);
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="text-base">Status</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="brand-lg"
                        variant={variant}
                        disabled={isPending}
                        className="w-full justify-between"
                    >
                        <span className="flex items-center gap-2">
                            <Icon />
                            {label}
                        </span>
                        <ChevronDownIcon />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-48"
                    align="end"
                >
                    {status === 'draft' && (
                        <DropdownMenuItem onSelect={() => handleStatusChange('published')}>
                            <GlobeIcon />
                            Publish
                        </DropdownMenuItem>
                    )}

                    {status === 'published' && (
                        <DropdownMenuItem onSelect={() => handleStatusChange('draft')}>
                            <FileTextIcon />
                            Move to Draft
                        </DropdownMenuItem>
                    )}

                    {status === 'archived' && (
                        <DropdownMenuItem onSelect={() => handleStatusChange('draft')}>
                            <ArchiveRestoreIcon />
                            Restore
                        </DropdownMenuItem>
                    )}

                    {status !== 'archived' && (
                        <DropdownMenuItem onSelect={() => handleStatusChange('archived')}>
                            <ArchiveIcon />
                            Archive
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                        <a
                            href={`/shop/product/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLinkIcon />
                            View in Shop
                        </a>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onSelect={handleDelete}
                        variant="destructive"
                    >
                        <Trash2Icon />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
