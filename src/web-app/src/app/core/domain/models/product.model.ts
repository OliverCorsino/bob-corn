export interface Product {
    id: string;
    purchasedAt: Date;
    shippedAt: Date | null;
}