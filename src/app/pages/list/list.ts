import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';

import { Product } from '../../models/Product.model';
import { ListItem } from './list-item/list-item';
import { PRODUCTS } from '../../data/products';

interface ProductFilters {
  category: string;
  priceMin: number;
  priceMax: number;
  searchQuery: string;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest';
  inStockOnly: boolean;
}

interface ViewMode {
  type: 'grid' | 'list';
  itemsPerPage: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ListItem],
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
})
export class List implements OnInit {

  // Platform detection (SSR fix)
  private platformId = inject(PLATFORM_ID);
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Sidebar
  showFiltersSidebar: boolean = true;
  toggleFiltersSidebar(): void {
    this.showFiltersSidebar = !this.showFiltersSidebar;
  }

  products: Product[] = PRODUCTS;
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  categories: string[] = [];

  selectedCategory: string = '';

  filters: ProductFilters = {
    category: '',
    priceMin: 0,
    priceMax: 1000,
    searchQuery: '',
    sortBy: 'newest',
    inStockOnly: false
  };

  viewMode: ViewMode = {
    type: 'grid',
    itemsPerPage: 12
  };

  currentPage: number = 1;
  totalPages: number = 1;

  maxPrice: number = 1000;
  minPrice: number = 0;

  showMobileFilters: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.extractCategories();
    this.calculatePriceRange();
    this.applyFilters();
  }

  // ============================================
  // CATEGORY EXTRACTION
  // ============================================
  extractCategories(): void {
    const set = new Set<string>();
    this.products.forEach(p => p.category && set.add(p.category));
    this.categories = Array.from(set).sort();
  }

  // ============================================
  // PRICE RANGE
  // ============================================
  calculatePriceRange(): void {
    if (!this.products.length) return;

    this.minPrice = Math.min(...this.products.map(p => p.price));
    this.maxPrice = Math.ceil(Math.max(...this.products.map(p => p.price)) / 100) * 100;
    this.filters.priceMax = this.maxPrice;
  }

  // ============================================
  // APPLY FILTERS (NO SCROLL!!!)
  // ============================================
  applyFilters(): void {
    let result = [...this.products];

    if (this.filters.category) {
      result = result.filter(p => p.category === this.filters.category);
    }

    result = result.filter(
      p => p.price >= this.filters.priceMin && p.price <= this.filters.priceMax
    );

    if (this.filters.inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    if (this.filters.searchQuery) {
      const q = this.filters.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    result = this.sortProducts(result);

    this.filteredProducts = result;
    this.currentPage = 1;
    this.updatePagination(false); // NO SCROLL
  }

  // ============================================
  // SORTING
  // ============================================
  sortProducts(arr: Product[]): Product[] {
    switch (this.filters.sortBy) {
      case 'price-asc': return arr.sort((a, b) => a.price - b.price);
      case 'price-desc': return arr.sort((a, b) => b.price - a.price);
      case 'rating': return arr.sort((a, b) => b.rating - a.rating);
      case 'name': return arr.sort((a, b) => a.title.localeCompare(b.title));
      case 'newest':
        return arr.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
      default:
        return arr;
    }
  }

  // ============================================
  // PAGINATION (SCROLL ONLY ON USER ACTION)
  // ============================================
  updatePagination(scroll: boolean = false): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.viewMode.itemsPerPage);

    const start = (this.currentPage - 1) * this.viewMode.itemsPerPage;
    const end = start + this.viewMode.itemsPerPage;

    this.displayedProducts = this.filteredProducts.slice(start, end);

    if (scroll && this.isBrowser()) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination(true);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  // ============================================
  // FILTER EVENTS
  // ============================================
  onCategoryChange() { this.applyFilters(); }
  onSortChange() { this.applyFilters(); }
  onSearchChange() { this.applyFilters(); }
  onPriceRangeChange() { this.applyFilters(); }
  onStockFilterChange() { this.applyFilters(); }

  resetFilters(): void {
    this.selectedCategory = '';
    this.filters = {
      category: '',
      priceMin: this.minPrice,
      priceMax: this.maxPrice,
      searchQuery: '',
      sortBy: 'newest',
      inStockOnly: false
    };
    this.applyFilters();
  }

  // ============================================
  // VIEW MODE
  // ============================================
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.type = mode;
  }

  // ============================================
  // CART
  // ============================================
  onQuickAddToCart(product: Product): void {
    const cart = this.getCartFromStorage();
    const item = cart.find((c: any) => c.id === product.id);

    if (item) item.quantity++;
    else cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} додано в кошик`);
  }

  getCartFromStorage(): any[] {
    const store = localStorage.getItem('cart');
    return store ? JSON.parse(store) : [];
  }

  // ============================================
  // VIEW PRODUCT
  // ============================================
  onViewProduct(id: number): void {
    this.router.navigate(['/profile', id]);
  }

  // ============================================
  // FILTERS (MOBILE)
  // ============================================
  toggleMobileFilters(): void {
    this.showMobileFilters = !this.showMobileFilters;
  }

  // ============================================
  // ACTIVE FILTER CHECK
  // ============================================
  hasActiveFilters(): boolean {
    return (
      this.filters.category !== '' ||
      this.filters.searchQuery !== '' ||
      this.filters.priceMin !== this.minPrice ||
      this.filters.priceMax !== this.maxPrice ||
      this.filters.inStockOnly
    );
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.filters.category) count++;
    if (this.filters.searchQuery) count++;
    if (this.filters.priceMin !== this.minPrice || this.filters.priceMax !== this.maxPrice) count++;
    if (this.filters.inStockOnly) count++;
    return count;
  }
}