import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Costumer } from "@/app/interfaces/Costumer";
import { LoginResponse } from "@/app/interfaces/Login";
import { addCostumer } from "@/app/services/costumers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

interface formProps {
    error: string | null;
    onCreateCostumerFn: (costumer: Costumer) => void
}

export default function AddCostumerForm(props: formProps) {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const createCostumer = (e: React.FormEvent) => {
        e.preventDefault()
        props.onCreateCostumerFn({id, name, email, address})

        setId("")
        setName("")
        setEmail("")
        setAddress("")
    }

    return (
        <div className="max-w-[500px] border py-10 px-10 rounded-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Agregar cliente</h3>
            </div>
            <form onSubmit={createCostumer} className="space-y-4">
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2">Id del client<span className="text-red-500">*</span></Label>
                    <Input onChange={(e) => { setId(e.target.value) }} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="string" value={id} />
                </div>
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2">Nombre del cliente<span className="text-red-500">*</span></Label>
                    <Input onChange={(e) => { setName(e.target.value) }} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="string" value={name} />
                </div>
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2">Email<span className="text-red-500">*</span></Label>
                    <Input onChange={(e) => { setEmail(e.target.value) }} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="email" value={email} />
                </div>
                <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2">Direccion<span className="text-red-500">*</span></Label>
                    <Input onChange={(e) => { setAddress(e.target.value) }} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="string" value={address} />
                </div>
                {props.error && <span className="text-red-500 my-2 text-sm font-bold">{props.error}</span>}
                <div>
                    <Button type="submit" className="cursor-pointer w-full mt-2">Guardar</Button>
                </div>
            </form>
        </div>
    )
}