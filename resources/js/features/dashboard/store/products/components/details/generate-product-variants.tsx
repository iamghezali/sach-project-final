import { RefreshCwIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCreateProductVariant } from '@/features/dashboard/store/products/mutations';
import type { Attribute } from '@/features/dashboard/store/products/schema';
import { CreateProductVariantRequestSchema } from '@/features/dashboard/store/products/schema';

interface ExistingVariant {
    attribute_value_ids: number[];
}

interface GenerateProductVariantsProps {
    productId: number;
    productSlug: string;
    attributes: Attribute[];
    existingVariants: ExistingVariant[];
}

type CombinationStatus = 'idle' | 'pending' | 'success' | 'error' | 'exists';

interface GeneratedCombination {
    key: string;
    attribute_value_ids: number[];
    labels: { attributeName: string; value: string }[];
    sku: string;
    price: number;
    stock_quantity: number;
    status: CombinationStatus;
    errorMessage?: string;
}

// Order-agnostic key so dedup works regardless of how the backend orders attribute_value_ids on existing variants
function sortedKey(ids: number[]): string {
    return [...ids].sort((a, b) => a - b).join('-');
}

// attributes order is preserved in each output combo — index i always corresponds to attributes[i],
// which is what the backend (and the old form's attribute_value_ids.${i} fields) relies on
function cartesianProduct(valueArrays: number[][]): number[][] {
    return valueArrays.reduce<number[][]>(
        (acc, values) => acc.flatMap((combo) => values.map((v) => [...combo, v])),
        [[]],
    );
}

export default function GenerateProductVariants({
    productId,
    productSlug,
    attributes = [],
    existingVariants = [],
}: GenerateProductVariantsProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Record<number, number[]>>({});
    const [bulkPrice, setBulkPrice] = useState(1000);
    const [bulkStock, setBulkStock] = useState(0);
    const [combinations, setCombinations] = useState<GeneratedCombination[]>([]);

    const { mutateAsync: createVariant } = useCreateProductVariant(productId);
    const schema = useMemo(() => CreateProductVariantRequestSchema(attributes.length), [attributes.length]);

    const valueLookup = useMemo(() => {
        const map = new Map<number, { value: string; slug: string }>();
        attributes.forEach((attribute) => attribute.values.forEach((v) => map.set(v.id, v)));

        return map;
    }, [attributes]);

    const existingKeys = useMemo(
        () => new Set(existingVariants.map((v) => sortedKey(v.attribute_value_ids))),
        [existingVariants],
    );

    const toggleValue = (attributeId: number, valueId: number, checked: boolean) => {
        setSelected((prev) => {
            const current = prev[attributeId] ?? [];

            return {
                ...prev,
                [attributeId]: checked ? [...current, valueId] : current.filter((id) => id !== valueId),
            };
        });
    };

    const toggleAll = (attribute: Attribute) => {
        const current = selected[attribute.id] ?? [];
        const allSelected = current.length === attribute.values.length;
        setSelected((prev) => ({
            ...prev,
            [attribute.id]: allSelected ? [] : attribute.values.map((v) => v.id),
        }));
    };

    const canGenerate = attributes.every((attribute) => (selected[attribute.id] ?? []).length > 0);

    const handleGenerate = () => {
        const valueArrays = attributes.map((attribute) => selected[attribute.id] ?? []);
        const combos = cartesianProduct(valueArrays); // no more .filter() here

        setCombinations(
            combos.map((combo) => {
                const values = combo.map((id) => valueLookup.get(id)!);
                const alreadyExists = existingKeys.has(sortedKey(combo));

                return {
                    key: combo.join('-'),
                    attribute_value_ids: combo,
                    labels: values.map((v, i) => ({ attributeName: attributes[i].name, value: v.value })),
                    sku: [productSlug, ...values.map((v) => v.slug)].join('-'),
                    price: bulkPrice,
                    stock_quantity: bulkStock,
                    status: alreadyExists ? 'exists' : 'idle',
                };
            }),
        );
    };

    const updateCombination = (key: string, patch: Partial<GeneratedCombination>) => {
        setCombinations((prev) => prev.map((c) => (c.key === key ? { ...c, ...patch } : c)));
    };

    const creatableCount = combinations.filter((c) => c.status === 'idle' || c.status === 'error').length;
    const isCreating = combinations.some((c) => c.status === 'pending');

    const handleCreateAll = async () => {
        for (const combo of combinations) {
            if (combo.status === 'success' || combo.status === 'exists') {
                continue;
            }

            updateCombination(combo.key, { status: 'pending', errorMessage: undefined });

            const parsed = schema.safeParse({
                sku: combo.sku,
                price: combo.price,
                stock_quantity: combo.stock_quantity,
                attribute_value_ids: combo.attribute_value_ids,
            });

            if (!parsed.success) {
                updateCombination(combo.key, {
                    status: 'error',
                    errorMessage: parsed.error.issues[0]?.message ?? 'Invalid data',
                });
                continue;
            }

            try {
                await createVariant({ productId, payload: parsed.data });
                updateCombination(combo.key, { status: 'success' });
            } catch (error) {
                updateCombination(combo.key, {
                    status: 'error',
                    errorMessage: error instanceof Error ? error.message : 'Failed to create variant',
                });
            }
        }
    };

    const handleReset = () => {
        setSelected({});
        setCombinations([]);
        setBulkPrice(1000);
        setBulkStock(0);
    };

    const handleDialog = (open: boolean) => {
        if (open) {
            handleReset();
        }

        setIsOpen(open);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleDialog}
        >
            <DialogTrigger asChild>
                <Button disabled={attributes.length === 0}>New Variants</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Generate Product Variants</DialogTitle>
                    <DialogDescription className="sr-only">
                        Select attribute values and generate variant combinations
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {attributes.map((attribute) => {
                        const attrSelected = selected[attribute.id] ?? [];

                        return (
                            <div
                                key={attribute.id}
                                className="flex flex-col gap-2 border-b pb-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{attribute.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => toggleAll(attribute)}
                                        className="text-sm text-muted-foreground underline"
                                    >
                                        {attrSelected.length === attribute.values.length
                                            ? 'Deselect all'
                                            : 'Select all'}
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {attribute.values.map((value) => (
                                        <label
                                            key={value.id}
                                            className="flex items-center gap-1.5 text-sm"
                                        >
                                            <Checkbox
                                                variant="brand-primary"
                                                checked={attrSelected.includes(value.id)}
                                                onCheckedChange={(checked) =>
                                                    toggleValue(attribute.id, value.id, !!checked)
                                                }
                                            />
                                            {value.value}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-end gap-3">
                        <label className="flex flex-col gap-1 text-sm">
                            Default price
                            <Input
                                variant="brand-primary"
                                type="number"
                                step="any"
                                min={0}
                                value={bulkPrice}
                                onChange={(e) => setBulkPrice(Number(e.target.value))}
                                className="rounded border px-2 py-1"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            Default stock
                            <Input
                                variant="brand-primary"
                                type="number"
                                min={0}
                                value={bulkStock}
                                onChange={(e) => setBulkStock(Number(e.target.value))}
                                className="rounded border px-2 py-1"
                            />
                        </label>
                        <Button
                            variant="brand-neutral"
                            size="brand-lg"
                            type="button"
                            disabled={!canGenerate}
                            onClick={handleGenerate}
                        >
                            Generate Combinations
                        </Button>

                        {combinations.length > 0 && (
                            <Button
                                type="button"
                                variant="brand-outline"
                                size="icon"
                                className="size-12"
                                onClick={handleReset}
                            >
                                <RefreshCwIcon />
                            </Button>
                        )}
                    </div>

                    {combinations.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <ScrollArea className="max-h-60 rounded-md border p-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-muted-foreground">
                                            <th className="py-1">Combination</th>
                                            <th>SKU</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {combinations.map((combo) => {
                                            const isExisting = combo.status === 'exists';

                                            return (
                                                <tr
                                                    key={combo.key}
                                                    className={`border-t ${isExisting ? 'opacity-60' : ''}`}
                                                >
                                                    <td className="py-1.5">
                                                        {combo.labels.map((l) => l.value).join(' / ')}
                                                    </td>
                                                    <td className="px-1">
                                                        <Input
                                                            value={combo.sku}
                                                            disabled={isExisting}
                                                            onChange={(e) =>
                                                                updateCombination(combo.key, { sku: e.target.value })
                                                            }
                                                            className="w-full rounded border-0 px-2 py-1 disabled:cursor-not-allowed"
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            step="any"
                                                            value={combo.price}
                                                            disabled={isExisting}
                                                            onChange={(e) =>
                                                                updateCombination(combo.key, {
                                                                    price: Number(e.target.value),
                                                                })
                                                            }
                                                            className="w-20 rounded border px-2 py-1 disabled:cursor-not-allowed"
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            value={combo.stock_quantity}
                                                            disabled={isExisting}
                                                            onChange={(e) =>
                                                                updateCombination(combo.key, {
                                                                    stock_quantity: Number(e.target.value),
                                                                })
                                                            }
                                                            className="w-16 rounded border px-2 py-1 disabled:cursor-not-allowed"
                                                        />
                                                    </td>
                                                    <td>
                                                        <StatusBadge
                                                            status={combo.status}
                                                            message={combo.errorMessage}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </ScrollArea>
                            <Button
                                type="button"
                                variant="brand-neutral"
                                size="brand-md"
                                disabled={isCreating || creatableCount === 0}
                                onClick={handleCreateAll}
                            >
                                {isCreating
                                    ? 'Creating…'
                                    : `Create ${creatableCount} Variant${creatableCount === 1 ? '' : 's'}`}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function StatusBadge({ status, message }: { status: CombinationStatus; message?: string }): JSX.Element {
    const styles: Record<CombinationStatus, string> = {
        idle: 'text-muted-foreground',
        pending: 'text-blue-600',
        success: 'text-green-600',
        error: 'text-red-600',
        exists: 'text-amber-600',
    };
    const text: Record<CombinationStatus, string> = {
        idle: 'Pending',
        pending: 'Creating…',
        success: 'Created',
        error: message ?? 'Failed',
        exists: 'Already exists',
    };

    return <span className={styles[status]}>{text[status]}</span>;
}
