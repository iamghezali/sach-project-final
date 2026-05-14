import type { JSX } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCategoriesList } from '@/features/dashboard/store/categories/queries';

export default function CategoriesTable(): JSX.Element {
    const { data: response, isLoading } = useCategoriesList();

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
                        <TableRow key={attribute.id}>
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
