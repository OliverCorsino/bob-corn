import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../core/domain/models/product.model';
import { ProductHandler } from '../../application/product/product.handler';
import { AuthStore } from '../../application/auth/auth.store';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, TableModule, TagModule, InputTextModule, FormsModule, ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  readonly productHandler = inject(ProductHandler);
  readonly authStore = inject(AuthStore);
  
  products!: Product[];
  isLoading = this.productHandler.isLoading;

  ngOnInit(): void {
    this.productHandler.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Products loaded successfully:', products);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }

  logout(): void {
    this.authStore.logout();
  }

  buy() {
    this.productHandler.purchaseCorn();
  }
}
