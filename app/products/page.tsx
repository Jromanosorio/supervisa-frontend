"use client"

import { useEffect, useState } from "react";
import TableProducts from "../components/table/table.products";
import { getProductList } from "../services/products";
import { Product } from "../interfaces/Product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import AddProductForm from "../components/form/add.product";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoginResponse } from "../interfaces/Login";

export default function Products() {
  const [productList, setProductList] = useState<any>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { storedValue } = useLocalStorage<LoginResponse | null>('session', null)

  const fetchProducts = async () => {

    try {
      const data = await getProductList(storedValue?.token!);
      setProductList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [storedValue])

  return (
    <div className="flex w-full container flex gap-6 m-auto px-6 mt-10">
      {
        productList.length <= 0
          ? <Alert variant="default" className="h-[80px]">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>No se han agregado productos</AlertDescription>
          </Alert>
          : <TableProducts data={productList} />
      }
      <AddProductForm />
    </div>
  );
}
