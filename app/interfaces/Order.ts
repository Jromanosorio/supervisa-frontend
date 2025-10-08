interface OrderProduct {
    productCode: number;
    productName: string;
    quantity: number;
}

export interface Order {
    clientId: string;
    clientName: string;
    products: Array<OrderProduct>;
    total: number;
}