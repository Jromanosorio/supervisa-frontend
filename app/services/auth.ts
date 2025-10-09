import { API_URL } from "@/lib/config";
import { LoginResponse } from "../interfaces/Login";

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error en el inicio de sesión");
    }

    return response.json();
}

export async function register(name: string, email: string, password: string): Promise<any> {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error creando la cuenta");
    }

    return response.json();
}