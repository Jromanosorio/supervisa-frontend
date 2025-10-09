import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import FormatNumber from "@/utils/numberFormatter";

interface TableProps {
  data: any[];
}

export default function TableProducts(props: TableProps) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="bg-blue-300">
          <TableHead className="font-bold">Producto</TableHead>
          <TableHead className="font-bold">Precio</TableHead>
          <TableHead className="font-bold">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((product) => (
          <TableRow key={product.code}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{FormatNumber(product.price)}</TableCell>
            <TableCell className="">{product.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
