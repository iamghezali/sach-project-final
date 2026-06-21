import type { JSX } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import NewAttributeValue from '@/features/dashboard/store/attributes/components/new-attribute-value';
import { useAttributeWithValues } from '@/features/dashboard/store/attributes/queries';
import { useSheetState } from '@/providers/sheet-provider';

type ShowAttributeProps = {
    attributeID: number;
};

export default function ShowAttribute({ attributeID }: ShowAttributeProps): JSX.Element {
    const { data: response } = useAttributeWithValues(attributeID);
    const { open, onOpenChange, onAnimationEnd } = useSheetState();

    const attribute = response?.data;

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="right"
                onAnimationEnd={onAnimationEnd}
                className="bg-brand-neutral-100 data-[side=right]:sm:max-w-lg"
            >
                <SheetHeader>
                    <SheetTitle>Attribute Details</SheetTitle>
                    <SheetDescription>Attribute Details Description</SheetDescription>
                </SheetHeader>

                <div className="p-4">
                    <div>
                        <ul>
                            <li>Attribute ID: {attribute?.id}</li>
                            <li>Attribute Name: {attribute?.name}</li>
                            <li>Attribute Slug: {attribute?.slug}</li>
                        </ul>
                    </div>

                    <div className="mt-3">
                        <NewAttributeValue attributeID={attributeID} />
                    </div>

                    <div className="mt-4">
                        <h2 className="text-lg">Attribute Values</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Slug</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {attribute?.values.length !== 0 ? (
                                    attribute?.values.map((value) => (
                                        <TableRow key={value.id}>
                                            <TableCell>{value.id}</TableCell>
                                            <TableCell>{value.value}</TableCell>
                                            <TableCell>{value.slug}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center text-muted-foreground"
                                        >
                                            No Records are found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
