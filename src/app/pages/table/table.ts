import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Імпортуємо масив даних
import { PRODUCTS } from '../../data/products';
// Імпортуємо інтерфейс (модель), оскільки він лежить окремо
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class TablePage {
  products: Product[] = PRODUCTS;

  constructor(private router: Router) {}

  buyNow(item: Product) {
    this.router.navigate(['/form'], { queryParams: { id: item.id } });
  }
}