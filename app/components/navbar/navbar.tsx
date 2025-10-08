import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { LoginResponse } from "@/app/interfaces/Login";
import Image from "next/image";
import Link from "next/link";
import { GoSignOut } from "react-icons/go";

export default function Navbar() {
    const { storedValue, removeValue } = useLocalStorage<LoginResponse | null>('session', null) 

    const signOut = () => {
        removeValue()
        window.location.href = '/'
    }

    return (
        <nav className="flex justify-between items-center gap-10 border-b-2 p-6">
            <Link href={'/'}>
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
            </Link>
            <div className="flex gap-x-4 font-semibold">
                <ul><Link href={'/products'}>Productos</Link></ul>
                <ul><Link href={'/costumers'}>Clientes</Link></ul>
                <ul><Link href={'/orders'}>Pedidos</Link></ul>

            </div>
            <button onClick={signOut} className="flex items-center gap-4">
                <p className="font-semibold">{storedValue?.user.name}</p>
                <a className="rounded-full flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 px-4 cursor-pointer">
                    <GoSignOut size={20} /> <p>Salir</p>
                </a>
            </button>
        </nav>
    )
}