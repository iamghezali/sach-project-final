import type { VariantProps } from 'class-variance-authority';
import {
    ArchiveIcon,
    ArchiveRestoreIcon,
    CheckIcon,
    ChevronDownIcon,
    FileTextIcon,
    GlobeIcon,
    Trash2Icon,
} from 'lucide-react';
import type { JSX } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { buttonVariants } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
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

const PRIMARY_CONFIG: Record<
    ProductStatus,
    {
        label: string;
        icon: React.ElementType;
        action: ProductStatus | null;
        variant: ButtonVariant;
    }
> = {
    draft: { label: 'Publish', icon: GlobeIcon, action: 'published', variant: 'default' },
    published: { label: 'Published', icon: CheckIcon, action: null, variant: 'outline' },
    archived: { label: 'Restore', icon: ArchiveRestoreIcon, action: 'draft', variant: 'outline' },
};

export default function ChangeProductStatus({ productID }: ChangeProductStatusProps): JSX.Element {
    const { data: response } = useProductDetails(productID);
    const { mutateAsync: changeProductStatus, isPending } = useChangeProductStatus();

    if (!response) {
        return <></>;
    }

    const status = response.data.status;
    const product = response.data;

    const { label, icon: Icon, action, variant } = PRIMARY_CONFIG[status];

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
        <div className="flex gap-3">
            <ButtonGroup>
                <Button
                    variant={variant}
                    disabled={!action || isPending}
                    onClick={() => action && handleStatusChange(action)}
                >
                    <Icon />
                    {label}
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="icon"
                            variant={variant}
                            disabled={isPending}
                        >
                            <ChevronDownIcon />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-40">
                        {status === 'draft' && (
                            <DropdownMenuItem onSelect={() => handleStatusChange('archived')}>
                                <ArchiveIcon />
                                Archive
                            </DropdownMenuItem>
                        )}

                        {status === 'published' && (
                            <>
                                <DropdownMenuItem onSelect={() => handleStatusChange('draft')}>
                                    <FileTextIcon />
                                    Move to Draft
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleStatusChange('archived')}>
                                    <ArchiveIcon />
                                    Archive
                                </DropdownMenuItem>
                            </>
                        )}

                        {status !== 'archived' && <DropdownMenuSeparator />}

                        <DropdownMenuItem
                            onSelect={handleDelete}
                            variant="destructive"
                        >
                            <Trash2Icon />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ButtonGroup>

            <Button
                variant="secondary"
                asChild
            >
                <a
                    href={`/shop/product/${product.slug}`}
                    target="_blank"
                >
                    View in Shop
                </a>
            </Button>
        </div>
    );
}
