import type { JSX } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCustomersList } from '@/features/dashboard/users/customers/queries';

export default function CustomersTable(): JSX.Element {
    const { data: response, isLoading } = useCustomersList();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const customersList = response.data;

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
                {customersList.length !== 0 ? (
                    customersList.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.joined}</TableCell>
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
