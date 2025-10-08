import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { register } from "@/app/services/auth"

export default function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await register(name, email, password);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <Card className="w-full max-w-sm mx-auto my-20">
            <CardHeader>
                <CardTitle>Crear cuenta</CardTitle>
                <CardDescription>
                    Ingresa tus datos para crear una cuenta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="ejemplo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Registrarse
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
