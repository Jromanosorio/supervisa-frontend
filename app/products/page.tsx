"use client";

import { useEffect, useState } from "react";
import TableProducts from "../components/table/table.products";
import { addProduct, getProductList } from "../services/products";
import { Product } from "../interfaces/Product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoAlert } from "react-icons/go";
import AddProductForm from "../components/form/add.product";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoginResponse } from "../interfaces/Login";
import { MoonLoader } from "react-spinners";
import { useProductStore } from "../store/useProductStore";

export default function Products() {
  const { productList, setProductList } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const { storedValue } = useLocalStorage<LoginResponse | null>("session", null);

  const createProduct = async (product: Product) => {
    try {
      await addProduct(product, storedValue?.token!);
      await fetchProducts();
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  const fetchProducts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      setLoading(true);
      const data = await getProductList(storedValue?.token!);
      console.log(data)
      setProductList(data as any);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [storedValue]);

  return (
    <div className="flex w-full container gap-6 m-auto px-6 mt-10">
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-[200px] text-gray-500">
          <MoonLoader className="animate-spin w-8 h-8 mb-2" />
          <p>Cargando productos...</p>
        </div>
      ) : productList.length <= 0 ? (
        <Alert variant="default" className="h-[80px]">
          <GoAlert />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>No se han agregado productos</AlertDescription>
        </Alert>
      ) : (
        <TableProducts data={productList} />
      )}

      <AddProductForm onCreateProductFn={createProduct} error={formError} />
    </div>
  );
}