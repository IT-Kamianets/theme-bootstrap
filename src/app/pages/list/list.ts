import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/Product.model';
import { ListItem } from './list-item/list-item';
import { PRODUCTS } from '../../data/products';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, ListItem],
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
  standalone: true,
})
export class List implements OnInit {
  products: Product[] = PRODUCTS;
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.extractCategories();
    this.filteredProducts = [...this.products];
  }

  extractCategories(): void {
    const categorySet = new Set<string>();
    this.products.forEach(product => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    this.categories = Array.from(categorySet).sort();
  }

  onCategoryChange(): void {
    if (this.selectedCategory === '' || this.selectedCategory === null) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === this.selectedCategory
      );
    }
  }

  onViewProduct(productId: number): void {
    console.log('Viewing product:', productId);
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.onCategoryChange();
  }
}