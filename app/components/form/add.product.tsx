import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { LoginResponse } from "@/app/interfaces/Login";
import { Product } from "@/app/interfaces/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

interface formProps {
    error: string | null;
    onCreateProductFn: (product: Product) => void
}

export default function AddProductForm(props: formProps) {
    const [code, setCode] = useState(0)
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)


    const createProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        props.onCreateProductFn({code, name: productName, price, stock})

        setCode(0)
        setProductName("")
        setPrice(0)
        setStock(0)
    }

    return (
        <div className="max-w-[500px] border py-10 px-10 rounded-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Agregar Producto</h3>
            </div>
            <form onSubmit={createProduct} className="space-y-4" >
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
                {props.error && <span className="text-red-500 my-2 text-sm font-bold">{props.error}</span>}
                <div>
                    <Button type="submit" className="cursor-pointer w-full">Crear</Button>
                </div>
            </form>
        </div>
    )
}