import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
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
  imports: [CommonModule, SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, TableModule, TagModule, InputTextModule, FormsModule, ButtonModule, ToastModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class Dashboard implements OnInit {
  readonly productHandler = inject(ProductHandler);
  readonly authStore = inject(AuthStore);
  readonly messageService = inject(MessageService);

  products!: Product[];
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.productHandler.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load products.' });
      }
    });
  }

  logout(): void {
    this.authStore.logout();
  }

  buy() {
    this.isLoading.set(true);
    this.productHandler.purchaseCorn().subscribe({
      next: (result: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Corn purchased successfully.',
          key: 'br',
          life: 3000
        });
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to purchase corn.' });
        this.isLoading.set(false);
      }
    });
  }
}
