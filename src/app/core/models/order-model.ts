export interface ProductOrderModel<T> {
    product: T;
    quantity: number;
    details: string;
}