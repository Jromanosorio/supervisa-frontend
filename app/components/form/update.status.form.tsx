import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { LoginResponse } from "@/app/interfaces/Login";
import { Product } from "@/app/interfaces/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { GoArrowDown } from "react-icons/go";

interface formProps {
    error: string | null;
    orderId: string;
    onSaveStatusFn: (orderId: string, status: string) => void
}

export default function UpdateStatusForm(props: formProps) {
    const [orderId, setOrderId] = useState(props.orderId)
    const [status, setStatus] = useState('');

    const updateStatus = async (e: React.FormEvent) => {
        e.preventDefault()
        props.onSaveStatusFn(orderId, status)
    }

    return (
        <div className="max-w-[500px] border py-10 px-10 rounded-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Actualizar estado orden: {orderId}</h3>
            </div>
            <form onSubmit={updateStatus} className="space-y-4" >
                <div className="relative flex items-center">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none pr-8 cursor-pointer"
                    >
                        <option value="">Seleccionar producto</option>
                        <option value={'pendiente'}>Pendiente</option>
                        <option value={'en_proceso'}>En proceso</option>
                        <option value={'enviado'}>Enviado</option>
                        <option value={'entregado'}>Entregado</option>
                    </select>
                    <GoArrowDown className="absolute right-2 top-1/3 text-sm pointer-events-none" />
                </div>
                {props.error && <span className="text-red-500 my-2 text-sm font-bold">{props.error}</span>}
                <div>
                    <Button type="submit" className="cursor-pointer w-full">Actualizar</Button>
                </div>
            </form>
        </div>
    )
}