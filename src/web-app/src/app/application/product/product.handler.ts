import { inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, tap } from "rxjs";
import { ProductRepository } from "../../core/domain/repositories/product.repository";
import { Product } from "../../core/domain/models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductHandler {
    readonly productRepository = inject(ProductRepository)

    getProducts() {
        return this.productRepository.getProducts();
    }

    purchaseCorn() {
        return this.productRepository.purchaseCorn();
    }

    shipProducts(productsToShip: Product[]) {
        return this.productRepository.shipProducts(productsToShip);
    }
}