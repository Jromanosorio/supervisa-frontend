import { API_URL } from "@/lib/config";
import { Order } from "../interfaces/Order";

export async function getOrders(token: string, estado?: string): Promise<Order> {

    const response = await fetch(`${API_URL}/orders${estado ? `?estado=${estado}`: ''}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error obteniendo los pedidos");
    }

    return response.json();
}

export async function createNewOrder(order: Order, token: string): Promise<any> {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error)
        throw new Error(error.message || "Error creando el pedido");
    }

    return response.json();
}

export async function updateOrderStatus(id: string, status: string, token: string): Promise<any> {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({status}),
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error)
        throw new Error(error.message || "Error actualizando el estado");
    }

    return response.json();
}