"use client"

import { use, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import { createNewOrder, getOrders, updateOrderStatus } from "../services/orders";
import TableOrders from "../components/table/table.orders";
import { Order, OrderProduct } from "../interfaces/Order";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoginResponse } from "../interfaces/Login";
import AddOrderForm from "../components/form/add.order";
import { MoonLoader } from "react-spinners";
import UpdateStatusForm from "../components/form/update.status.form";
import { useSearchParams } from "next/navigation";

export default function Orders() {
  const [ordersList, setOrdersList] = useState<any>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [orderToUpdate, setOrderToUpdate] = useState<any>();
  const searchParams = useSearchParams()
  
  const estado = searchParams.get('estado') as string | undefined

  const { storedValue } = useLocalStorage<LoginResponse | null>('session', null)

  const createOrder = async (order: Order) => {
    try {
      await createNewOrder(order, storedValue?.token!)
      fetchOrders()
    } catch (error: any) {
      setFormError(error.message);
    }
  }

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status, storedValue?.token!)
      fetchOrders()
    } catch (error: any) {
      setFormError(error.message);
    }
  }

  const fetchOrders = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    try {
      const data = await getOrders(storedValue?.token!, estado);
      setOrdersList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [storedValue, estado])

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
          : <TableOrders data={ordersList} onEditData={setOrderToUpdate} />
      }
      {
        orderToUpdate && <UpdateStatusForm error={formError} orderId={orderToUpdate._id} onSaveStatusFn={updateStatus} />
      }

      <AddOrderForm onCreateOrderFn={createOrder} error={formError} />
    </div>
  );
}
