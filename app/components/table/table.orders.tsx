import { OrderProduct } from "@/app/interfaces/Order";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import FormatNumber from "@/utils/numberFormatter";
import { GoPencil } from "react-icons/go";

interface TableProps {
  data: any[];
  onEditData: any;
}

export default function TableOrders(props: TableProps) {

  const editData = (data: any) => {
    props.onEditData(data)
  }

  return (
    <Table>
      <TableHeader className="bg-blue-300">
        <TableRow>
          <TableHead className="font-bold">Id</TableHead>
          <TableHead className="font-bold">Nombre del cliente</TableHead>
          <TableHead className="font-bold">Products</TableHead>
          <TableHead className="font-bold">Total</TableHead>
          <TableHead className="font-bold">Estado</TableHead>
          <TableHead className="font-bold">Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order._id}</TableCell>
            <TableCell>{order.clientName}</TableCell>
            <TableCell>{order.products.map((item: OrderProduct, idx: number) => {
              return(
                <p key={idx}>{item.productName} x{item.quantity}</p>
              )
            })}

            </TableCell>
            <TableCell>{FormatNumber(order.total)}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableHead className="font-bold">
              <GoPencil onClick={() => editData(order)} />
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
