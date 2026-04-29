import { Observable } from "rxjs";

export abstract class ProductRepository {
    abstract purchaseCorn(): Observable<void>;
}