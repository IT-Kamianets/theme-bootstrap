import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/Product.model';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.html',
  styleUrls: ['./list-item.css']
})
export class ListItem implements OnInit {

  @Input() product!: Product;
  @Input() viewMode: 'grid' | 'list' = 'grid';

  @Output() viewProduct = new EventEmitter<number>();
  @Output() quickAddToCart = new EventEmitter<Product>();

  isFavorite = false;
  isHovered = false;

  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.checkFavoriteStatus();
  }

  checkFavoriteStatus(): void {
    const favs = this.getFavoritesFromStorage();
    this.isFavorite = favs.includes(this.product.id);
  }

  getFavoritesFromStorage(): number[] {
    if (!this.isBrowser()) return [];
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    if (!this.isBrowser()) return;

    let favs = this.getFavoritesFromStorage();

    if (favs.includes(this.product.id)) {
      favs = favs.filter(id => id !== this.product.id);
      this.isFavorite = false;
    } else {
      favs.push(this.product.id);
      this.isFavorite = true;
    }

    localStorage.setItem('favorites', JSON.stringify(favs));
  }

  onView(): void {
    this.viewProduct.emit(this.product.id);
    this.router.navigate(['/profile', this.product.id]);
  }

  onQuickAdd(event: Event): void {
    event.stopPropagation();
    if (this.product.stock > 0) {
      this.quickAddToCart.emit(this.product);
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  getDiscountedPrice(): number {
    return this.product.discount
      ? this.product.price * (1 - this.product.discount / 100)
      : this.product.price;
  }

  hasDiscount(): boolean {
    return !!this.product.discount && this.product.discount > 0;
  }

  isInStock(): boolean {
    return this.product.stock > 0;
  }

  getStockStatus(): string {
    if (this.product.stock === 0) return 'Немає в наявності';
    if (this.product.stock < 10) return `Залишилось ${this.product.stock}`;
    return 'В наявності';
  }

  getStockClass(): string {
    if (this.product.stock === 0) return 'out-of-stock';
    if (this.product.stock < 10) return 'low-stock';
    return 'in-stock';
  }
}
