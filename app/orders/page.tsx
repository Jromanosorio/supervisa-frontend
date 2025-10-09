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
import { MoonLoader } from "react-spinners";

export default function Orders() {
  const [ordersList, setOrdersList] = useState<any>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { storedValue } = useLocalStorage<LoginResponse | null>('session', null)

  const createOrder = async (order: Order) => {
    

        console.log(order)

    try {
      await createNewOrder(order, storedValue?.token!)
      fetchOrders()
    } catch (error: any) {
      setFormError(error.message);
    }
  }

  const fetchOrders = async () => {
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
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
        loading ?  (
        <div className="flex flex-col items-center justify-center w-full h-[200px] text-gray-500">
          <MoonLoader className="animate-spin w-8 h-8 mb-2" />
          <p>Cargando pedidos...</p>
        </div>
      ) :
        ordersList.length <= 0
          ? <Alert variant="default" className="h-[80px]">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>Todavia no se han realizado pedidos</AlertDescription>
          </Alert>
          : <TableOrders data={ordersList} />
      }
      <AddOrderForm onCreateOrderFn={createOrder} error={formError} />
    </div>
  );
}
