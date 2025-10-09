import { OrderProduct } from "@/app/interfaces/Order";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import FormatNumber from "@/utils/numberFormatter";

interface TableProps {
  data: any[];
}

export default function TableOrders(props: TableProps) {
  return (
    <Table>
      <TableHeader className="bg-blue-300">
        <TableRow>
          <TableHead className="font-bold">Nombre del cliente</TableHead>
          <TableHead className="font-bold">Products</TableHead>
          <TableHead className="font-bold">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order.clientName}</TableCell>
            <TableCell>{order.products.map((item: OrderProduct, idx: number) => {
              return(
                <p key={idx}>{item.productName} x{item.quantity}</p>
              )
            })}

            </TableCell>
            <TableCell>{FormatNumber(order.total)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
