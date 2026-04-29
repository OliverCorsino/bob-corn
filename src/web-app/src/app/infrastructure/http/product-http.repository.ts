import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ProductRepository } from "../../core/domain/repositories/product.repository";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProductHttpRepository extends ProductRepository {
    readonly #http = inject(HttpClient);
    readonly #apiUrl = `${environment.apiUrl}/products`;

    purchaseCorn(): Observable<void> {
        return this.#http.post<void>(`${this.#apiUrl}/purchase`, {});
    }

}