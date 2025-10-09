import { Order } from "../interfaces/Order";

export async function getOrders(token: string): Promise<Order> {
    const response = await fetch("http://localhost:3001/api/orders", {
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
    const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        const error = await response.json();
        
        throw new Error(error.message || "Error creando el pedido");
    }

    return response.json();
}