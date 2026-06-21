import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AddProductVariant from '@/features/dashboard/store/products/components/details/add-product-variant';
import { useProductDetails } from '@/features/dashboard/store/products/queries';

type ProductVariantsProps = {
    productID: number;
};
export default function ProductVariants({ productID }: ProductVariantsProps): JSX.Element {
    const { data: response, isLoading } = useProductDetails(productID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const variants = response.data.variants;
    const attributes = response.data.attributes;

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">Variants</h2>
                <AddProductVariant
                    productId={productID}
                    attributes={attributes}
                />
            </div>
            <Table className="mt-3">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Variant</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantiy</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Default</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {variants.length !== 0 ? (
                        variants.map((variant) => (
                            <TableRow key={variant.id}>
                                <TableCell>{variant.id}</TableCell>
                                <TableCell>{variant.sku}</TableCell>
                                <TableHead>
                                    {variant.variant_values.map((value, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                        >
                                            {value}
                                        </Badge>
                                    ))}
                                </TableHead>
                                <TableCell>{variant.price} DZD</TableCell>
                                <TableCell>
                                    {variant.is_in_stock ? (
                                        variant.stock_quantity
                                    ) : (
                                        <Badge variant="destructive">Out of Stock</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{variant.is_active ? 'Active' : 'Disabled'}</Badge>
                                </TableCell>
                                <TableCell>{variant.is_default && <Badge>Default</Badge>}</TableCell>
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
