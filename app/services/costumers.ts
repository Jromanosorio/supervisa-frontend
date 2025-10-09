import { API_URL } from "@/lib/config";
import { Costumer } from "../interfaces/Costumer";
import { Order } from "../interfaces/Order";

export async function getCostumers(token: string): Promise<Order> {
    const response = await fetch(`${API_URL}/clients`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error obteniendo los clientes");
    }

    return response.json();
}

export async function addCostumer(costumerData: Costumer, token: string): Promise<any> {
    const response = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(costumerData),
    });

    console.log(response)

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error agregando el cliente");
    }

    return response.json();
}