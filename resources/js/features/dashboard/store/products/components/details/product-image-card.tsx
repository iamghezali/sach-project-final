import { TagIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRemoveProductImage, useUpdateProductImage } from '@/features/dashboard/store/products/mutations';
import type { Attribute, ProductMedia } from '@/features/dashboard/store/products/schema';

interface ProductImageCardProps {
    productId: number;
    image: ProductMedia;
    attributes: Attribute[];
}

export default function ProductImageCard({ productId, image, attributes }: ProductImageCardProps) {
    const { mutateAsync: removeImage, isPending: isDeleting } = useRemoveProductImage(productId);
    const { mutateAsync: updateImage, isPending: isUpdating } = useUpdateProductImage(productId);

    const flatOptions = (attributes ?? []).flatMap((attr) =>
        attr.values.map((val) => ({
            id: val.id,
            label: `${attr.name}: ${val.value}`,
        })),
    );

    const currentTagId = image.attribute_value_ids[0]; // Logic for single-tag selection
    const currentLabel = flatOptions.find((o) => o.id === currentTagId)?.label || 'No Tag';

    // 3. Action Handlers
    const handleTagChange = async (valueId: string) => {
        const id = parseInt(valueId);
        const payload = id === 0 ? [] : [id];

        try {
            await updateImage({
                uuid: image.uuid,
                payload: { attribute_value_ids: payload },
            });
        } catch {
            // Error handled by mutation toast, but we catch here to stop execution
        }
    };

    const handleDelete = async () => {
        try {
            await removeImage(image.uuid);
            toast.success('Image deleted');
        } catch {
            // Error handled by mutation toast
        }
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
            {/* Image Preview Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                    src={image.url}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt="Product media"
                    loading="lazy"
                />

                {/* Loading Overlay */}
                {(isDeleting || isUpdating) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
                        <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                )}

                {/* Delete Button (Visible on Hover) */}
                {!isDeleting && (
                    <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 size-7 translate-y-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                        onClick={handleDelete}
                    >
                        <XIcon className="size-4" />
                    </Button>
                )}

                {/* Order Badge */}
                <div className="absolute bottom-2 left-2 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-md">
                    Pos: {image.order}
                </div>
            </div>

            {/* Footer: Tagging Selector */}
            <div className="border-t p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-full justify-between px-2 text-[11px] font-medium hover:bg-accent"
                            disabled={isUpdating || isDeleting}
                        >
                            <span className="truncate">{currentLabel}</span>
                            <TagIcon
                                className={`ml-2 size-3 shrink-0 ${currentTagId ? 'text-primary' : 'text-muted-foreground/40'}`}
                            />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="start"
                        className="w-56"
                    >
                        <DropdownMenuLabel className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                            Link Image to Attribute
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuRadioGroup
                            value={currentTagId?.toString() || '0'}
                            onValueChange={handleTagChange}
                        >
                            {/* Option to clear tags */}
                            <DropdownMenuRadioItem
                                value="0"
                                className="text-xs"
                            >
                                <span className={!currentTagId ? 'font-bold text-primary' : ''}>General (No Tag)</span>
                            </DropdownMenuRadioItem>

                            <DropdownMenuSeparator />

                            {/* List of attribute values assigned to the product */}
                            {flatOptions.map((opt) => (
                                <DropdownMenuRadioItem
                                    key={opt.id}
                                    value={opt.id.toString()}
                                    className="flex items-center justify-between text-xs"
                                >
                                    <span className={currentTagId === opt.id ? 'font-bold text-primary' : ''}>
                                        {opt.label}
                                    </span>
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
