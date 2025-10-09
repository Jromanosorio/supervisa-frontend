"use client"

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import { createNewOrder, getOrders } from "../services/orders";
import TableOrders from "../components/table/table.orders";
import { Order, OrderProduct } from "../interfaces/Order";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoginResponse } from "../interfaces/Login";
import AddOrderForm from "../components/form/add.order";

export default function Orders() {
  const [ordersList, setOrdersList] = useState<any>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { storedValue } = useLocalStorage<LoginResponse | null>('session', null)

  const createOrder = async (clientId: string, productsToOrder: Array<OrderProduct>) => {
    try {
      await createNewOrder({ clientId, productsToOrder }, storedValue?.token!)
      fetchOrders()
    } catch (error: any) {
      setError(error.message);
    }
  }

  const fetchOrders = async () => {
    try {
      const data = await getOrders(storedValue?.token!);
      setOrdersList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [storedValue])

  return (
    <div className="flex w-full container gap-6 m-auto px-6 my-4">
      {
        ordersList.length <= 0
          ? <Alert variant="default" className="h-[80px]">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>Todavia no se han realizado pedidos</AlertDescription>
          </Alert>
          : <TableOrders data={ordersList} />
      }
      <AddOrderForm onCreateOrder={createOrder} />
    </div>
  );
}
