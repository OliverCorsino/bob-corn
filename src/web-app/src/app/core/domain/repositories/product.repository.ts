import { Observable } from "rxjs";
import { Product } from "../models/product.model";

export abstract class ProductRepository {
    abstract getProducts(): Observable<Product[]>;
    abstract purchaseCorn(): Observable<void>;
    abstract shipProducts(productsToShip: Product[]): Observable<void>;
}