// models/Product.model.ts
export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	category: string;
	image: string;
	rating: number;

	// Ð Ð¾Ð·ÑˆÐ¸Ñ€ÐµÐ½Ñ– Ð¿Ð¾Ð»Ñ
	images?: string[]; // Ð“Ð°Ð»ÐµÑ€ÐµÑ Ñ„Ð¾Ñ‚Ð¾ (Ð¼Ñ–Ð½Ñ–Ð°Ñ‚ÑŽÑ€Ð¸)
	stock: number; // ÐšÑ–Ð»ÑŒÐºÑ–ÑÑ‚ÑŒ Ð½Ð° ÑÐºÐ»Ð°Ð´Ñ–
	sku?: string; // ÐÑ€Ñ‚Ð¸ÐºÑƒÐ»
	brand?: string; // Ð‘Ñ€ÐµÐ½Ð´
	discount?: number; // Ð—Ð½Ð¸Ð¶ÐºÐ° Ð² %
	isNew?: boolean; // ÐÐ¾Ð²Ð¸Ð½ÐºÐ°
	specifications?: {
		// Ð”ÐµÑ‚Ð°Ð»ÑŒÐ½Ñ– Ñ…Ð°Ñ€Ð°ÐºÑ‚ÐµÑ€Ð¸ÑÑ‚Ð¸ÐºÐ¸
		[key: string]: string;
	};
	reviews?: ProductReview[]; // Ð’Ñ–Ð´Ð³ÑƒÐºÐ¸ ÐºÐ¾Ñ€Ð¸ÑÑ‚ÑƒÐ²Ð°Ñ‡Ñ–Ð²
	relatedProductIds?: number[]; // ID ÑÑ…Ð¾Ð¶Ð¸Ñ… Ñ‚Ð¾Ð²Ð°Ñ€Ñ–Ð²
	tags?: string[]; // Ð¢ÐµÐ³Ð¸ Ð´Ð»Ñ Ð¿Ð¾ÑˆÑƒÐºÑƒ
}

export interface ProductReview {
	id: number;
	author: string;
	rating: number;
	comment: string;
	date: Date;
	verified?: boolean; // ÐŸÑ–Ð´Ñ‚Ð²ÐµÑ€Ð´Ð¶ÐµÐ½Ð° Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ°
}

// Ð¢Ð¸Ð¿ Ð´Ð»Ñ Ñ„Ñ–Ð»ÑŒÑ‚Ñ€Ñ–Ð²
export interface ProductFilters {
	category: string;
	priceMin: number;
	priceMax: number;
	searchQuery: string;
	sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'newest';
	inStockOnly: boolean;
}

// Ð¢Ð¸Ð¿ Ð´Ð»Ñ Ð½Ð°Ð»Ð°ÑˆÑ‚ÑƒÐ²Ð°Ð½ÑŒ Ð²Ñ–Ð´Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð½Ñ
export interface ViewMode {
	type: 'grid' | 'list';
	itemsPerPage: number;
}
