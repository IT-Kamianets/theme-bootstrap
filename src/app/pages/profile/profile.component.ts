import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductReview } from '../../models/Product.model';
import { PRODUCTS } from '../../data/products';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  product: Product | null = null;
  productId: number | null = null;
  notFound = false;
  isFavorite = false;
  activeTab = 'details';

  selectedImage = '';
  imageIndex = 0;

  relatedProducts: Product[] = [];

  showReviewForm = false;
  newReview = {
    author: '',
    rating: 5,
    comment: ''
  };

  quantity = 1;

  private products = PRODUCTS;
  private platformId = inject(PLATFORM_ID);
  private routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // ÐŸÑ–Ð´Ð¿Ð¸ÑÐºÐ° Ð· Ð²Ñ–Ð´Ð¿Ð¸ÑÐºÐ¾ÑŽ Ñƒ ngOnDestroy
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.notFound = true;
        return;
      }

      this.productId = parseInt(id, 10);
      this.loadProduct(this.productId);

      if (this.isBrowser()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadProduct(id: number): void {
    const found = this.products.find(p => p.id === id);

    if (!found) {
      this.product = null;
      this.notFound = true;
      return;
    }

    this.product = found;
    this.notFound = false;

    this.selectedImage = found.image;

    this.relatedProducts = this.products
      .filter(p => found.relatedProductIds?.includes(p.id))
      .slice(0, 4);

    this.checkFavoriteStatus();
  }

  checkFavoriteStatus(): void {
    const favorites = this.getFavoritesFromStorage();
    this.isFavorite = favorites.includes(this.product!.id);
  }

  getFavoritesFromStorage(): number[] {
    if (!this.isBrowser()) return [];
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }

  getCartFromStorage(): any[] {
    if (!this.isBrowser()) return [];
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  toggleFavorite(): void {
    if (!this.isBrowser() || !this.product) return;

    const favs = this.getFavoritesFromStorage();
    const id = this.product.id;

    if (favs.includes(id)) {
      this.isFavorite = false;
      const updated = favs.filter(x => x !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      this.showNotification('Ð’Ð¸Ð´Ð°Ð»ÐµÐ½Ð¾ Ð· ÑƒÐ»ÑŽÐ±Ð»ÐµÐ½Ð¸Ñ…');
    } else {
      this.isFavorite = true;
      favs.push(id);
      localStorage.setItem('favorites', JSON.stringify(favs));
      this.showNotification('Ð”Ð¾Ð´Ð°Ð½Ð¾ Ð² ÑƒÐ»ÑŽÐ±Ð»ÐµÐ½Ñ–');
    }
  }

  addToCart(): void {
    if (!this.product || !this.isBrowser()) return;

    let cart = this.getCartFromStorage();
    const existing = cart.find(i => i.id === this.product!.id);

    if (existing) {
      existing.quantity += this.quantity;
    } else {
      cart.push({
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        image: this.product.image,
        quantity: this.quantity
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.showNotification(`${this.product.title} Ð´Ð¾Ð´Ð°Ð½Ð¾ Ð² ÐºÐ¾ÑˆÐ¸Ðº (${this.quantity} ÑˆÑ‚.)`);
    this.quantity = 1;
  }

  showNotification(msg: string): void {
    if (this.isBrowser()) alert(msg);
  }

  selectImage(img: string, index: number): void {
    this.selectedImage = img;
    this.imageIndex = index;
  }

  nextImage(): void {
    if (!this.product?.images) return;
    this.imageIndex = (this.imageIndex + 1) % this.product.images.length;
    this.selectedImage = this.product.images[this.imageIndex];
  }

  previousImage(): void {
    if (!this.product?.images) return;
    this.imageIndex =
      this.imageIndex === 0
        ? this.product.images.length - 1
        : this.imageIndex - 1;
    this.selectedImage = this.product.images[this.imageIndex];
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
    if (!this.showReviewForm) this.resetReviewForm();
  }

  submitReview(): void {
    if (!this.product) return;
    if (!this.newReview.author || !this.newReview.comment) return;

    const review: ProductReview = {
      id: Date.now(),
      author: this.newReview.author,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
      date: new Date(),
      verified: false
    };

    if (!this.product.reviews) {
      this.product.reviews = [];
    }

    this.product.reviews.unshift(review);
    this.showNotification('Ð”ÑÐºÑƒÑ”Ð¼Ð¾ Ð·Ð° Ð²Ð°Ñˆ Ð²Ñ–Ð´Ð³ÑƒÐº!');
    this.resetReviewForm();
    this.showReviewForm = false;
  }

  resetReviewForm(): void {
    this.newReview = {
      author: '',
      rating: 5,
      comment: ''
    };
  }

  navigateToList(): void {
    this.router.navigate(['/list.component']);
  }

  navigateToProduct(id: number): void {
    this.router.navigate(['/profile.component', id], { replaceUrl: true });
  }

  shareProduct(): void {
    if (!this.isBrowser() || !this.product) return;

    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: this.product.title,
        text: this.product.description,
        url
      }).catch(() => this.copyToClipboard(url));
    } else {
      this.copyToClipboard(url);
    }
  }

  copyToClipboard(text: string): void {
    if (!this.isBrowser()) return;
    navigator.clipboard.writeText(text).then(() => {
      this.showNotification('ÐŸÐ¾ÑÐ¸Ð»Ð°Ð½Ð½Ñ ÑÐºÐ¾Ð¿Ñ–Ð¹Ð¾Ð²Ð°Ð½Ð¾');
    });
  }

  getDiscountedPrice(): number {
    if (this.product?.discount) {
      return this.product.price * (1 - this.product.discount / 100);
    }
    return this.product?.price || 0;
  }

  hasDiscount(): boolean {
    return !!this.product?.discount;
  }

  isInStock(): boolean {
    return !!this.product?.stock && this.product.stock > 0;
  }

  getStockStatus(): string {
    if (!this.product) return '';
    if (this.product.stock === 0) return 'ÐÐµÐ¼Ð°Ñ” Ð² Ð½Ð°ÑÐ²Ð½Ð¾ÑÑ‚Ñ–';
    if (this.product.stock < 10) return `Ð—Ð°Ð»Ð¸ÑˆÐ¸Ð»Ð¾ÑÑŒ ${this.product.stock} ÑˆÑ‚.`;
    return 'Ð’ Ð½Ð°ÑÐ²Ð½Ð¾ÑÑ‚Ñ–';
  }

  getStockClass(): string {
    if (!this.product) return '';
    if (this.product.stock === 0) return 'out-of-stock';
    if (this.product.stock < 10) return 'low-stock';
    return 'in-stock';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  setRating(rating: number): void {
    this.newReview.rating = rating;
  }
}





