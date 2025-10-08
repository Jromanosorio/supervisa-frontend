"use client"

import { useEffect, useState } from "react";
import TableProducts from "../components/table/table.products";
import { getProductList } from "../services/products";
import { Product } from "../interfaces/Product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";

export default function Products() {
  const [productList, setProductList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getProductList();
      setProductList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
      {
        productList.length <= 0 
        ? <Alert variant="default">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>No se han agregado productos</AlertDescription>
          </Alert> 
        : <TableProducts data={productList} />
      }
    </div>
  );
}
