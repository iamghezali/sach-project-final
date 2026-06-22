import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditVariant from '@/features/dashboard/store/products/components/details/edit-variant';
import GenerateProductVariants from '@/features/dashboard/store/products/components/details/generate-product-variants';
import { useProductDetails } from '@/features/dashboard/store/products/queries';
import { useSheet } from '@/providers/sheet-provider';

type ProductVariantsProps = {
    productID: number;
};

export default function ProductVariants({ productID }: ProductVariantsProps): JSX.Element {
    const { openSheet } = useSheet();

    const { data: response, isLoading } = useProductDetails(productID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const variants = response.data.variants;
    const product = response.data;

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">Variants</h2>
                <GenerateProductVariants
                    productId={productID}
                    productSlug={product.slug}
                    attributes={product.attributes}
                    existingVariants={product.variants}
                />
            </div>
            <Table className="mt-3">
                <TableHeader>
                    <TableRow className="border-0">
                        <TableHead className="border-0 border-b">Variant</TableHead>
                        <TableHead className="border-0 border-b">Price</TableHead>
                        <TableHead className="border-0 border-b text-center">Quantiy</TableHead>
                        <TableHead className="border-0 border-b">Status</TableHead>
                        <TableHead className="border-0 border-b">Default</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {variants.length !== 0 ? (
                        variants.map((variant) => (
                            <TableRow
                                key={variant.id}
                                className="cursor-pointer"
                                onClick={() =>
                                    openSheet(
                                        <EditVariant
                                            productID={productID}
                                            variantID={variant.id}
                                        />,
                                    )
                                }
                            >
                                <TableCell className="border-0 border-b">
                                    <div className="flex flex-wrap gap-1">
                                        {variant.variant_values.map((value, i) => (
                                            <Badge
                                                key={i}
                                                variant="outline"
                                            >
                                                {value}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="border-0 border-b">{variant.price} DZD</TableCell>
                                <TableCell className="border-0 border-b text-center">
                                    {variant.is_in_stock ? (
                                        variant.stock_quantity
                                    ) : (
                                        <Badge variant="destructive">Out of Stock</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="border-0 border-b">
                                    <Badge variant="outline">{variant.is_active ? 'Active' : 'Disabled'}</Badge>
                                </TableCell>
                                <TableCell className="border-0 border-b">
                                    {variant.is_default && <Badge>Default</Badge>}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="text-center text-muted-foreground"
                            >
                                No Records are found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
