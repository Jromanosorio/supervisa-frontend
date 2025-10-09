import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { LoginResponse } from "@/app/interfaces/Login";
import { login } from "@/app/services/auth";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { setValue } = useLocalStorage<LoginResponse | null>("session", null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const data = await login(email, password);
      
      setValue(data);
      alert("Inicio de sesión exitoso ✅");
      window.location.href = '/'
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto my-20">
      <CardHeader>
        <CardTitle>Iniciar sesion</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para ingresar al sistema
        </CardDescription>
        {error && <span className="text-red-500 my-2 text-sm font-bold">{error}</span>}
      </CardHeader>
      <form onSubmit={handleLogin}>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@ejemplo.com"
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
              <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-4">
        <Button type="submit" className="w-full" onClick={handleLogin}>
          Iniciar sesion
        </Button>
      </CardFooter>
      </form>
    </Card>
  )
}
