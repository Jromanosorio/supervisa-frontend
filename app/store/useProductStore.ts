import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../interfaces/Product";

interface ProductStore {
  productList: Product[];
  setProductList: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      productList: [],
      setProductList: (productList) => set({ productList }),
      addProduct: (product) =>
        set((state) => ({ productList: [...state.productList, product] })),
      clearProducts: () => set({ productList: [] }),
    }),
    {
      name: "product-storage", // 👈 nombre de la clave en localStorage
    }
  )
);
