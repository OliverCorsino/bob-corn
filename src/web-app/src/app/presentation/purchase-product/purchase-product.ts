import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductHandler } from '../../application/product/product.handler';

@Component({
  selector: 'app-purchase-product',
  imports: [ReactiveFormsModule],
  templateUrl: './purchase-product.html',
  styleUrl: './purchase-product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseProduct {
  readonly fb = inject(FormBuilder);
  readonly productHandler = inject(ProductHandler);

  isLoading = this.productHandler.isLoading;
  error = this.productHandler.error;
  success = this.productHandler.success;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  buy() {
    this.productHandler.purchaseCorn();
  }
}
