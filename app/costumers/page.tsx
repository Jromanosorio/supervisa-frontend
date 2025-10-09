"use client"

import { useEffect, useState } from "react";
import TableProducts from "../components/table/table.products";
import { Product } from "../interfaces/Product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import { addCostumer, getCostumers } from "../services/costumers";
import { Order } from "../interfaces/Order";
import TableCostumers from "../components/table/table.costumers";
import AddCostumerForm from "../components/form/add.costumer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoginResponse } from "../interfaces/Login";
import { Costumer } from "../interfaces/Costumer";
import { MoonLoader } from "react-spinners";

export default function Costumers() {
  const [costumersList, setCostumersList] = useState<any>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { storedValue } = useLocalStorage<LoginResponse | null>('session', null)

  const createCostumer = async (costumer: Costumer) => {
    try {
      await addCostumer(costumer, storedValue?.token!)
      fetchCostumers()
    } catch (error: any) {
      setFormError(error.message);
    }
  }

  const fetchCostumers = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const data = await getCostumers(storedValue?.token!);
      setCostumersList(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostumers();
  }, [storedValue])

  return (
    <div className="flex w-full container gap-6 m-auto px-6 mt-10">
      {
        loading ?  (
        <div className="flex flex-col items-center justify-center w-full h-[200px] text-gray-500">
          <MoonLoader className="animate-spin w-8 h-8 mb-2" />
          <p>Cargando clientes...</p>
        </div>
      ) :
        costumersList.length <= 0
          ? <Alert variant="default" className="h-[80px]">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>Aun no hay clientes</AlertDescription>
          </Alert>
          : <TableCostumers data={costumersList} />
      }
      <AddCostumerForm onCreateCostumerFn={createCostumer} error={formError} />
    </div>
  );
}
