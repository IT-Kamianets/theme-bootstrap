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

	@Input() title: string = 'ÐÐ°ÑˆÑ– Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð¸';
	@Input() subtitle: string = 'ÐÐ°Ð¹ÐºÑ€Ð°Ñ‰Ñ– Ð¿Ñ€Ð¾Ð¿Ð¾Ð·Ð¸Ñ†Ñ–Ñ— Ñ‚Ð¸Ð¶Ð½Ñ';
	@Input() maxItems: number = 3;
	@Input() showViewAll: boolean = true;
	@Input() viewAllText: string = 'ÐŸÐ¾Ð´Ð¸Ð²Ð¸Ñ‚Ð¸ÑÑ Ð²ÑÑ–';

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.products = PRODUCTS;
	}

	get displayProducts(): Product[] {
		return this.products.slice(0, this.maxItems);
	}

	onViewProduct(productId: number): void {
		this.router.navigate(['/profile.component', productId]);
	}

	navigateToList(): void {
		this.router.navigate(['/list.component']);
	}
}
