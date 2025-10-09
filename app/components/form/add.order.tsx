import { useState } from "react";
import { GoArrowDown, GoPlus, GoTrash } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { OrderProduct } from "@/app/interfaces/Order";

interface formProps {
  onCreateOrder: (clientId: string, productsToOrder: Array<OrderProduct>) => void;
}

export default function AddOrderForm(props: formProps) {
  const [clientId, setClientId] = useState("");
  const [productsToOrder, setProductsToOrder] = useState<OrderProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Opcional: podrías reemplazar esto luego con datos reales desde tu backend
  const productOptions = [
    { code: 1, productName: "Laptop Gaming Pro", price: 1299.99 },
    { code: 2, productName: "Smartphone Ultra", price: 899.99 },
    { code: 3, productName: "Auriculares Inalámbricos", price: 199.99 },
    { code: 4, productName: "Tablet Pro", price: 599.99 },
    { code: 5, productName: "Monitor 4K", price: 399.99 },
  ];

  const addProduct = () => {
    if (!selectedProduct || quantity < 1) return;

    const product = productOptions.find((p) => p.code === selectedProduct);
    if (!product) return;

    const newProduct: OrderProduct = {
      productCode: product.code,
      productName: product.productName,
      quantity: quantity,
    };

    setProductsToOrder((prev) => [...prev, newProduct]);
    setSelectedProduct(0);
    setQuantity(1);
  };

  const removeProduct = (index: number) => {
    const updated = productsToOrder.filter((_, idx) => idx !== index);
    setProductsToOrder(updated);
  };

  const createOrder = (e: React.FormEvent) => {
    e.preventDefault();
    props.onCreateOrder(clientId, productsToOrder);
    setClientId("");
    setProductsToOrder([]);
  };

  return (
    <div className="max-w-[700px] border py-10 px-10 rounded-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Agregar pedido</h3>
      </div>

      <form onSubmit={createOrder} className="space-y-4">
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Id del cliente <span className="text-red-500">*</span>
          </Label>
          <Input
            onChange={(e) => setClientId(e.target.value)}
            required
            value={clientId}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* PRODUCTO Y CANTIDAD */}
        <div className="flex gap-4 items-end">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Producto
            </Label>
            <div className="relative flex items-center">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none pr-8 cursor-pointer"
              >
                <option value="">Seleccionar producto</option>
                {productOptions.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.productName} - ${p.price}
                  </option>
                ))}
              </select>
              <GoArrowDown className="absolute right-2 top-1/3 text-sm pointer-events-none" />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad
            </Label>
            <Input
              min="1"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <Button
              type="button"
              onClick={addProduct}
              disabled={!selectedProduct || quantity < 1}
              className="font-medium rounded-lg transition-colors duration-200 whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoPlus />
            </Button>
          </div>
        </div>

        {/* LISTA DE PRODUCTOS AGREGADOS */}
        {productsToOrder.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-semibold mb-2">Productos agregados:</h4>
            <ul className="text-sm space-y-1">
              {productsToOrder.map((p, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-1"
                >
                  <div>
                    {p.productName} x{p.quantity}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                      title="Eliminar producto"
                    >
                      <GoTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <Button type="submit" className="cursor-pointer w-full mt-2">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
