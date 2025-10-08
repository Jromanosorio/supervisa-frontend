import { Order } from "../interfaces/Order";

export async function getOrders(): Promise<Order> {
    const response = await fetch("http://localhost:3001/api/orders")

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error obteniendo los pedidos");
    }

    return response.json();
}

export async function createOrder(code: string, name: string, price: string, stock: string, token: string): Promise<any> {
    const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ code, name, price, stock }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error creando el pedido");
    }

    return response.json();
}