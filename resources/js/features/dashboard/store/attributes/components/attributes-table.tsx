import type { JSX } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ShowAttribute from '@/features/dashboard/store/attributes/components/show-attribute';
import { useAttributesList } from '@/features/dashboard/store/attributes/queries';
import { useSheet } from '@/providers/sheet-provider';

export default function AttributesTable(): JSX.Element {
    const { data: response, isLoading } = useAttributesList();
    const { openSheet } = useSheet();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const attributesList = response.data;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {attributesList.length !== 0 ? (
                    attributesList.map((attribute) => (
                        <TableRow
                            key={attribute.id}
                            className="cursor-pointer"
                            onClick={() => openSheet(<ShowAttribute attributeID={attribute.id} />)}
                        >
                            <TableCell>{attribute.id}</TableCell>
                            <TableCell>{attribute.name}</TableCell>
                            <TableCell>{attribute.slug}</TableCell>
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
    );
}
