import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { AuthStore } from '../../application/auth/auth.store';
import { ProductHandler } from '../../application/product/product.handler';
import { Product } from '../../core/domain/models/product.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SelectModule, IconFieldModule,
    InputIconModule, MultiSelectModule, TableModule,
    TagModule, InputTextModule, FormsModule,
    ButtonModule, ToastModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit {
  readonly productHandler = inject(ProductHandler);
  readonly authStore = inject(AuthStore);
  readonly messageService = inject(MessageService);

  products = signal<Product[]>([]);
  isBuying = signal<boolean>(false);
  isShipping = signal<boolean>(false);
  statuses!: any[];
  selectedProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProducts();
    this.statuses = [
      { label: 'Not yet shipped', value: false },
      { label: 'Shipped', value: true }
    ];
  }

  private getProducts() {
    this.productHandler.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load products.' });
      }
    });
  }

  logout(): void {
    this.authStore.logout();
  }

  getShippingStatus(product: Product): string {
    return product.isShipped ? 'shipped' : 'notYetShipped';
  }

  getShippingStatusLabel(product: Product): string {
    return product.isShipped ? 'Shipped' : 'Not yet shipped';
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';

      case false:
        return 'info';

      default:
        return 'success';
    }
  }

  buy() {
    this.isBuying.set(true);
    this.productHandler.purchaseCorn().subscribe({
      next: (result: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.isBuying.set(false);
        this.getProducts();
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
        this.isBuying.set(false);
      }
    });
  }

  shipSelectedProducts() {
    this.isShipping.set(true);

    this.productHandler.shipProducts(this.selectedProducts()).subscribe({
      next: (result: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.isShipping.set(false);
        this.getProducts();
        this.selectedProducts.set([]);
      },
      error: (err: any) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
        this.isShipping.set(false);
      }
    });
  }
}
