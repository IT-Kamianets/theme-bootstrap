import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/Product.model';
import { ListItemComponent } from './list-item/list-item.component';

@Component({
	selector: 'app-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, FormsModule, ListItemComponent],
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
})
export class ListComponent {
	private _router = inject(Router);
	private _platformId = inject(PLATFORM_ID);
	_isBrowser = isPlatformBrowser(this._platformId);

	// Toggles
	// Base Data
	projects = signal<Product[]>(PRODUCTS);
	viewMode = signal<'grid' | 'list'>('grid');

	// Filters State
	searchQuery = signal<string>('');
	selectedCategory = signal<string>('');
	selectedStatus = signal<string>('');

	// Derived Data (Computed)
	categories = computed(() => {
		const cats = new Set<string>();
		this.projects().forEach((p) => {
			if (p.category) cats.add(p.category);
		});
		return Array.from(cats).sort();
	});

	statuses = computed(() => {
		const stats = new Set<string>();
		this.projects().forEach((p) => {
			if (p.status) stats.add(p.status);
		});
		return Array.from(stats).sort();
	});

	filteredProjects = computed(() => {
		let result = this.projects();
		const query = this.searchQuery().toLowerCase().trim();
		const category = this.selectedCategory();
		const status = this.selectedStatus();

		if (query) {
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(query) ||
					p.description?.toLowerCase().includes(query) ||
					(p.technologies && p.technologies.some((t) => t.toLowerCase().includes(query)))
			);
		}

		if (category) {
			result = result.filter((p) => p.category === category);
		}

		if (status) {
			result = result.filter((p) => p.status === status);
		}

		return result;
	});

	activeFiltersCount = computed(() => {
		let count = 0;
		if (this.searchQuery()) count++;
		if (this.selectedCategory()) count++;
		if (this.selectedStatus()) count++;
		return count;
	});

	hasActiveFilters = computed(() => this.activeFiltersCount() > 0);

	// Methods
	resetFilters(): void {
		this.searchQuery.set('');
		this.selectedCategory.set('');
		this.selectedStatus.set('');
	}

	setViewMode(mode: 'grid' | 'list'): void {
		this.viewMode.set(mode);
	}

	onViewProject(id: number): void {
		this._router.navigate(['/profile', id]);
	}
}
