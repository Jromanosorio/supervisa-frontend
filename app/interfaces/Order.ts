export interface OrderProduct {
    productCode: number;
    productName: string;
    quantity: number;
}

export interface Order {
    clientId: string;
    productsToOrder: Array<OrderProduct>;
}