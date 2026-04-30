import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../core/domain/models/product.model';
import { ProductHandler } from '../../application/product/product.handler';

@Component({
  selector: 'app-dashboard',
  imports: [SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, TableModule, TagModule, InputTextModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  readonly productHandler = inject(ProductHandler);
  
  loading: boolean = true;
  products!: Product[];

  ngOnInit(): void {
    this.productHandler.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
        console.log('Products loaded successfully:', products);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.loading = false;
      }
    });
  }
}
