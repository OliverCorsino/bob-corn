export interface Product {
    id: string;
    purchasedAt: Date;
    isShipped: boolean;
    shippedAt: Date | null;
}