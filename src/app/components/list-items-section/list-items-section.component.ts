import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/Product.model';
import { ListItemComponent } from '../../pages/list/list-item/list-item.component';

@Component({
	selector: 'app-list-items-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, ListItemComponent],
	templateUrl: './list-items-section.component.html',
	styleUrls: ['./list-items-section.component.css'],
})
export class ListItemsSectionComponent implements OnInit {
	products: Product[] = [];

	@Input() title: string = 'Our products';
	@Input() subtitle: string = 'Top picks of the week';
	@Input() maxItems: number = 3;
	@Input() showViewAll: boolean = true;
	@Input() viewAllText: string = 'View all';

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.products = PRODUCTS;
	}

	get displayProducts(): Product[] {
		return this.products.slice(0, this.maxItems);
	}

	onViewProduct(productId: number): void {
		this.router.navigate(['/profile', productId]);
	}

	navigateToList(): void {
		this.router.navigate(['/list']);
	}
}
