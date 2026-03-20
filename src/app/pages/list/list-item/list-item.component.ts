import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	inject,
	input,
	output,
} from '@angular/core';
import { Product } from '../../../models/Product.model';

@Component({
	selector: 'app-list-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
	project = input.required<Product>({ alias: 'product' });
	viewMode = input<'grid' | 'list'>('grid');
	isFeatured = input<boolean>(false);

	viewProject = output<number>();

	private _platformId = inject(PLATFORM_ID);
	_isBrowser = isPlatformBrowser(this._platformId);

	onView(): void {
		this.viewProject.emit(this.project().id);
	}

	onImageError(event: Event): void {
		const img = event.target as HTMLImageElement;
		img.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
		img.onerror = null;
	}

	getStatusClass(status?: string): string {
		switch (status) {
			case 'active':
				return 'status--active';
			case 'maintenance':
				return 'status--maintenance';
			case 'completed':
				return 'status--completed';
			case 'planned':
				return 'status--planned';
			default:
				return 'status--unknown';
		}
	}

	getStatusLabel(status?: string): string {
		switch (status) {
			case 'active':
				return 'Active';
			case 'maintenance':
				return 'Maintenance';
			case 'completed':
				return 'Completed';
			case 'planned':
				return 'Planned';
			default:
				return 'Unknown';
		}
	}
}
