import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableProps {
    data: any[];
}

export default function TableCostumers(props: TableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-semibold">Nombre</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Direccion</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.data.map((user: any) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
