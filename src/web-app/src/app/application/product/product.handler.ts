import { inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, tap } from "rxjs";
import { ProductRepository } from "../../core/domain/repositories/product.repository";

@Injectable({ providedIn: 'root' })
export class ProductHandler {
    readonly productRepository = inject(ProductRepository)
    readonly isLoading = signal<boolean>(false);
    readonly success = signal<string | null>(null);
    readonly error = signal<string | null>(null);

    getProducts() {
        return this.productRepository.getProducts();
    }

    purchaseCorn(): void {
        this.isLoading.set(true);
        this.error.set(null);
        this.success.set(null);

        this.productRepository.purchaseCorn().pipe(
            tap((result: any) => {
                this.success.set(result.message);
                this.isLoading.set(false);
            }),
            catchError(err => {
                const msg = err.error ?? 'Unhandle error.';
                this.error.set(msg);
                this.isLoading.set(false);
                return EMPTY;
            })
        ).subscribe();
    }
}