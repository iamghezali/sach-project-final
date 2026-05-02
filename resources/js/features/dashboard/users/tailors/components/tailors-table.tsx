import type { JSX } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTailorsList } from '@/features/dashboard/users/tailors/queries';

export default function TailorsTable(): JSX.Element {
    const { data: response, isLoading } = useTailorsList();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const tailorsList = response.data;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {tailorsList.length !== 0 ? (
                    tailorsList.map((tailor) => (
                        <TableRow
                            key={tailor.id}
                            className="cursor-pointer"
                        >
                            <TableCell>{tailor.id}</TableCell>
                            <TableCell>{tailor.name}</TableCell>
                            <TableCell>{tailor.email}</TableCell>
                            <TableCell>{tailor.joined}</TableCell>
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
