import { Order } from "../interfaces/Order";

export async function getCostumers(): Promise<Order> {
    const response = await fetch("http://localhost:3001/api/clients")

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error obteniendo las ordenes");
    }

    return response.json();
}

export async function addCostumer(id: string, name: string, email: string, address: string, token: string): Promise<any> {
    const response = await fetch("http://localhost:3001/api/clients", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id, name, email, address }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error creando la cuenta");
    }

    return response.json();
}