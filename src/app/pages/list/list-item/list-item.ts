import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/Product.model';


@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.html',
  styleUrls: ['./list-item.css']
})
export class ListItem {
  @Input() product!: Product;
  @Output() viewProduct = new EventEmitter<number>();

  constructor(private router: Router) {}

  onView(): void {
    this.viewProduct.emit(this.product.id);
    this.router.navigate(['/profile', this.product.id]);
  }
}