import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS } from '../../data/products';
import { ListItemComponent } from '../../pages/list/list-item/list-item.component';

@Component({
	selector: 'app-list-items-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, ListItemComponent],
	templateUrl: './list-items-section.component.html',
	styleUrls: ['./list-items-section.component.css'],
})
export class ListItemsSectionComponent {
	title = input<string>('Our Ecosystem');
	subtitle = input<string>('Featured Tech Initiatives');
	maxItems = input<number>(3);
	showViewAll = input<boolean>(true);
	viewAllText = input<string>('Explore All Projects');

	private _router = inject(Router);

	displayProducts = computed(() => {
		return PRODUCTS.slice(0, this.maxItems());
	});

	onViewProject(productId: number): void {
		this._router.navigate(['/profile', productId]);
	}

	navigateToList(): void {
		this._router.navigate(['/list']);
	}
}
