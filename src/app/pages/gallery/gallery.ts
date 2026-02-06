import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

type GalleryItem = {
	id: number;
	title: string;
	subtitle: string;
	tags: string[];
	imageUrl: string;
};

@Component({
	selector: 'app-gallery',
	imports: [NgFor, NgIf, RouterLink, FormsModule],
	templateUrl: './gallery.html',
	styleUrl: './gallery.css',
})
export class Gallery {
	searchTerm = '';
	selectedCategory = 'All categories';
	pageSize = 8;
	currentPage = 1;

	categories = [
		'All categories',
		'Architecture',
		'Coast',
		'Craft',
		'Design',
		'Food',
		'Lifestyle',
		'Macro',
		'Minimal',
		'Nature',
		'Night',
		'Objects',
		'People',
		'Portrait',
		'Still Life',
		'Street',
		'Studio',
		'Travel',
		'Waterfront',
		'Workspace',
	];

	items: GalleryItem[] = [
		{
			id: 1,
			title: 'Alpine Ridge',
			subtitle: 'Landscape study',
			tags: ['Nature', 'Travel'],
			imageUrl: 'https://picsum.photos/seed/gallery-1/640/420',
		},
		{
			id: 2,
			title: 'City Grid',
			subtitle: 'Urban geometry',
			tags: ['Architecture', 'Street'],
			imageUrl: 'https://picsum.photos/seed/gallery-2/640/420',
		},
		{
			id: 3,
			title: 'Morning Market',
			subtitle: 'Everyday moments',
			tags: ['People', 'Lifestyle'],
			imageUrl: 'https://picsum.photos/seed/gallery-3/640/420',
		},
		{
			id: 4,
			title: 'Coastal Light',
			subtitle: 'Seaside tones',
			tags: ['Nature', 'Coast'],
			imageUrl: 'https://picsum.photos/seed/gallery-4/640/420',
		},
		{
			id: 5,
			title: 'Studio Notes',
			subtitle: 'Work in progress',
			tags: ['Design', 'Workspace'],
			imageUrl: 'https://picsum.photos/seed/gallery-5/640/420',
		},
		{
			id: 6,
			title: 'Cafe Table',
			subtitle: 'Cafe textures',
			tags: ['Food', 'Still Life'],
			imageUrl: 'https://picsum.photos/seed/gallery-6/640/420',
		},
		{
			id: 7,
			title: 'Night Transit',
			subtitle: 'Motion blur',
			tags: ['Street', 'Night'],
			imageUrl: 'https://picsum.photos/seed/gallery-7/640/420',
		},
		{
			id: 8,
			title: 'Desert Lines',
			subtitle: 'Minimal landscape',
			tags: ['Travel', 'Minimal'],
			imageUrl: 'https://picsum.photos/seed/gallery-8/640/420',
		},
		{
			id: 9,
			title: 'Botanical Study',
			subtitle: 'Green details',
			tags: ['Nature', 'Macro'],
			imageUrl: 'https://picsum.photos/seed/gallery-9/640/420',
		},
		{
			id: 10,
			title: 'Workshop Tools',
			subtitle: 'Craft & build',
			tags: ['Craft', 'Objects'],
			imageUrl: 'https://picsum.photos/seed/gallery-10/640/420',
		},
		{
			id: 11,
			title: 'Harbor Walk',
			subtitle: 'Afternoon stroll',
			tags: ['Travel', 'Waterfront'],
			imageUrl: 'https://picsum.photos/seed/gallery-11/640/420',
		},
		{
			id: 12,
			title: 'Portrait Study',
			subtitle: 'Soft light',
			tags: ['Portrait', 'Studio'],
			imageUrl: 'https://picsum.photos/seed/gallery-12/640/420',
		},
	];

	get filteredItems(): GalleryItem[] {
		const search = this.searchTerm.trim().toLowerCase();
		const category = this.selectedCategory;

		return this.items.filter((item) => {
			const matchesCategory =
				category === 'All categories' || item.tags.includes(category);

			if (!matchesCategory) {
				return false;
			}

			if (!search) {
				return true;
			}

			const haystack = `${item.title} ${item.subtitle} ${item.tags.join(' ')}`.toLowerCase();
			return haystack.includes(search);
		});
	}

	get totalPages(): number {
		return Math.max(1, Math.ceil(this.filteredItems.length / this.pageSize));
	}

	get pageNumbers(): number[] {
		return Array.from({ length: this.totalPages }, (_, index) => index + 1);
	}

	get pagedItems(): GalleryItem[] {
		const start = (this.currentPage - 1) * this.pageSize;
		return this.filteredItems.slice(start, start + this.pageSize);
	}

	get hasResults(): boolean {
		return this.filteredItems.length > 0;
	}

	onFiltersChanged(): void {
		this.currentPage = 1;
	}

	goToPage(page: number): void {
		if (page < 1 || page > this.totalPages) {
			return;
		}
		this.currentPage = page;
	}

	nextPage(): void {
		this.goToPage(this.currentPage + 1);
	}

	prevPage(): void {
		this.goToPage(this.currentPage - 1);
	}
}
