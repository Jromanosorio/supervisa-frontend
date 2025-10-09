import { FaBoxes } from "react-icons/fa";
import CardCustomComponent from "./components/card/card";
import { GoPeople, GoProject } from "react-icons/go";

export default function Home() {
  return (
    <div>
      <div className="font-sans border-b-1 px-6 py-4">
        <h1 className="text-[24px] font-bold">Panel administrativo</h1>
        <p>Panel de control del sistema</p>
      </div>
      <div className="max-w-[1200px] grid grid-cols-[1fr_1fr_1fr] px-6 py-4 justify-items-center gap-10 m-auto">
        <CardCustomComponent icon={<FaBoxes size={24} color="green"/>} service="Gestion de inventario" data={'Productos'} route={"products"} />
        <CardCustomComponent icon={<GoPeople size={24} color="blue"/>} service="Gestion de clientes" data={'Clientes'} route={"costumers"} />
        <CardCustomComponent icon={<GoProject size={24} color="purple"/> } service="Revisar pedidos realizados" data={'Pedidos'} route={"orders"} />
      </div>
    </div>
  );
}
