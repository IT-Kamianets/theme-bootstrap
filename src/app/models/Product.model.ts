export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	category: string;
	image: string;
	rating: number;

	// Rozshireni polya
	images?: string[]; // Galereya photo (miniatyury)
	stock: number; // Kilkist na skladi
	sku?: string; // Artikul
	brand?: string; // Brend
	discount?: number; // Znyzhka v %
	isNew?: boolean; // Novynka
	specifications?: {
		// Detalni harakterystyky
		[key: string]: string;
	};
	reviews?: ProductReview[]; // Vidhuky
	relatedProductIds?: number[]; // ID shozhyh tovariv
	tags?: string[]; // Tegs

	// Ecosystem / Project Specific Fields
	technologies?: string[]; // Tech stack (e.g., Angular, Node.js)
	fullDescription?: string; // Expanded description for the project page
	githubUrl?: string; // Link to repository
	demoUrl?: string; // Link to live demo
	status?: 'active' | 'maintenance' | 'completed' | 'planned'; // Project status
	team?: { name: string; role: string; avatar: string; githubUrl?: string }[]; // Contributors
}

export interface ProductReview {
	id: number;
	author: string;
	rating: number;
	comment: string;
	date: Date;
	verified?: boolean;
}

export interface ProductFilters {
	category: string;
	priceMin: number;
	priceMax: number;
	searchQuery: string;
	sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest';
	inStockOnly: boolean;
}

export interface ViewMode {
	type: 'grid' | 'list';
	itemsPerPage: number;
}
