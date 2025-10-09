import { Product } from "../interfaces/Product";

export async function getProductList(token: string): Promise<Product> {
    const response = await fetch("http://localhost:3001/api/products", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error obteniendo los productos");
    }

    return response.json();
}

export async function addProduct(code: number, name: string, price: number, stock: number, token: string): Promise<any> {
    const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ code, name, price, stock }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message );
    }

    return response.json();
}