import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Ð†Ð¼Ð¿Ð¾Ñ€Ñ‚ÑƒÑ”Ð¼Ð¾ Ð¼Ð°ÑÐ¸Ð² Ð´Ð°Ð½Ð¸Ñ…
import { PRODUCTS } from '../../data/products';
// Ð†Ð¼Ð¿Ð¾Ñ€Ñ‚ÑƒÑ”Ð¼Ð¾ Ñ–Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹Ñ (Ð¼Ð¾Ð´ÐµÐ»ÑŒ), Ð¾ÑÐºÑ–Ð»ÑŒÐºÐ¸ Ð²Ñ–Ð½ Ð»ÐµÐ¶Ð¸Ñ‚ÑŒ Ð¾ÐºÑ€ÐµÐ¼Ð¾
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TablePageComponent {
  products: Product[] = PRODUCTS;

  constructor(private router: Router) {}

  buyNow(item: Product) {
    this.router.navigate(['/form.component'], { queryParams: { id: item.id } });
  }
}





