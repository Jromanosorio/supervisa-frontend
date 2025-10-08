"use client"

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import { getOrders } from "../services/orders";
import TableOrders from "../components/table/table.orders";
import { Order } from "../interfaces/Order";

export default function Products() {
  const [ordersList, setOrdersList] = useState<Order[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrdersList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
      {
        ordersList.length <= 0 
        ? <Alert variant="default">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>Todavia no se han realizado pedidos</AlertDescription>
          </Alert> 
        : <TableOrders data={ordersList} />
      }
    </div>
  );
}
