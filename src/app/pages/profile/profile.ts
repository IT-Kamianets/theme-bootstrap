import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product.model';
import { ChangeDetectorRef } from '@angular/core';
import { PRODUCTS } from '../../data/products';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  product: Product | null = null;
  productId: number | null = null;
  notFound: boolean = false;
  isFavorite: boolean = false;
  activeTab: string = 'details';

  // Data source
  private products = PRODUCTS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = parseInt(id, 10);
        this.loadProduct(this.productId);
      } else {
        this.notFound = true;
      }
    });
  }

  loadProduct(id: number): void {
  setTimeout(() => {
    const foundProduct = this.products.find(p => p.id === id);

    if (foundProduct) {
      this.product = foundProduct;
      this.notFound = false;
    } else {
      this.product = null;
      this.notFound = true;
    }

    this.cdr.detectChanges(); // ← гарантує оновлення UI
  }, 300);
}

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  addToCart(): void {
    alert(`${this.product?.title} added to cart!`);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  navigateToList(): void {
    this.router.navigate(['/list']);
  }

  getPriceColor(): string {
  const mode = document.documentElement.getAttribute('data-mode');
  if (mode === 'itkp') {
    return '#dddddd'; // темно-синій для контрасту
  }
  return ''; // використовувати CSS
}
}

