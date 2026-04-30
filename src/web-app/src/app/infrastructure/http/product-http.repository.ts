import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../core/domain/models/product.model";
import { ProductRepository } from "../../core/domain/repositories/product.repository";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProductHttpRepository extends ProductRepository {
    readonly http = inject(HttpClient);
    readonly apiUrl = `${environment.apiUrl}/products`;

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    purchaseCorn(): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/purchase`, {});
    }

    shipProducts(productIds: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/ship`, { productIds });
    }

}