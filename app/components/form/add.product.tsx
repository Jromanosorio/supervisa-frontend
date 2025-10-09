import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { LoginResponse } from "@/app/interfaces/Login";
import { addProduct } from "@/app/services/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function AddProductForm() {
    const [code, setCode] = useState(0)
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    
    const [error, setError] = useState<string | null>(null)
    
    const { storedValue } = useLocalStorage<LoginResponse | null>('session', null) 

    const createProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = storedValue?.token

        try {
            await addProduct(code, productName, price, stock, token!)
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div className="max-w-[500px] border py-10 px-10 rounded-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Agregar Producto</h3>
            </div>
            <form onSubmit={createProduct} className="space-y-4" >
                {error && <span className="text-red-500 my-2 text-sm font-bold">{error}</span>}
                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Codigo del Producto<span className="text-red-500">*</span></Label>
                    <Input onChange={(e) => { setCode(Number(e.target.value))}} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="number" value={code} />
                </div>
                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto<span className="text-red-500">*</span></Label>
                    <Input onChange={(e) => { setProductName(e.target.value)}} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="text" value={productName} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Precio<span className="text-red-500">*</span></Label>
                        <Input onChange={(e) => { setPrice(Number(e.target.value))}} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="number" value={price} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Stock<span className="text-red-500">*</span></Label>
                        <Input onChange={(e) => { setStock(Number(e.target.value))}} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="number" value={stock} />
                    </div>
                </div>
                <div>
                    <Button type="submit" className="cursor-pointer w-full">Crear</Button>
                </div>
            </form>
        </div>
    )
}