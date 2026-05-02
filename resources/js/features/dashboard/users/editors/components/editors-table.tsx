import type { JSX } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEditorsList } from '@/features/dashboard/users/editors/queries';

export default function EditorsTable(): JSX.Element {
    const { data: response, isLoading } = useEditorsList();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const editorsList = response.data;

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
                {editorsList.length !== 0 ? (
                    editorsList.map((editor) => (
                        <TableRow key={editor.id}>
                            <TableCell>{editor.id}</TableCell>
                            <TableCell>{editor.name}</TableCell>
                            <TableCell>{editor.email}</TableCell>
                            <TableCell>{editor.joined}</TableCell>
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
