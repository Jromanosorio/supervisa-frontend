"use client"

import { useEffect, useState } from "react";
import TableProducts from "../components/table/table.products";
import { Product } from "../interfaces/Product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import { getCostumers } from "../services/costumers";
import { Order } from "../interfaces/Order";

export default function Products() {
  const [costumersList, setCostumersList] = useState<Order[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCostumers = async () => {
    try {
      const data = await getCostumers();
      setCostumersList(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostumers();
  }, [])

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
      {
        costumersList.length <= 0 
        ? <Alert variant="default">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>Aun no hay clientes</AlertDescription>
          </Alert> 
        : <TableProducts data={costumersList} />
      }
    </div>
  );
}
