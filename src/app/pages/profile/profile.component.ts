import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	OnDestroy,
	PLATFORM_ID,
	ViewChild,
	computed,
	inject,
	signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/Product.model';

@Component({
	selector: 'app-profile',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit, OnDestroy {
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _platformId = inject(PLATFORM_ID);
	_isBrowser = isPlatformBrowser(this._platformId);

	@ViewChild('galleryEl') galleryEl?: ElementRef<HTMLElement>;

	private _projects = PRODUCTS;
	private _touchStartX = 0;
	private _touchEndX = 0;
	private _boundTouchStart = this._onTouchStart.bind(this);
	private _boundTouchEnd = this._onTouchEnd.bind(this);

	private _productIdSignal = toSignal(
		this._route.paramMap.pipe(map((params) => parseInt(params.get('id') || '0', 10))),
		{ initialValue: 0 }
	);

	project = computed<Product | null>(() => {
		const id = this._productIdSignal();
		if (!id) return null;
		return this._projects.find((p) => p.id === id) || null;
	});

	notFound = computed(() => {
		const id = this._productIdSignal();
		return id > 0 && this.project() === null;
	});

	selectedImageIndex = signal<number>(0);

	mainImage = computed(() => {
		const p = this.project();
		if (!p) return '';
		const hasGallery = p.images && p.images.length > 0;
		return hasGallery ? p.images![this.selectedImageIndex()] : p.image;
	});

	relatedProjects = computed(() => {
		const p = this.project();
		if (!p || !p.technologies) return [];
		return this._projects
			.filter(
				(other) =>
					other.id !== p.id &&
					other.technologies &&
					other.technologies.some((tech) => p.technologies?.includes(tech))
			)
			.slice(0, 3);
	});

	constructor() {
		if (this._isBrowser) {
			window.scrollTo({ top: 0, behavior: 'instant' });
		}
	}

	ngAfterViewInit(): void {
		if (!this._isBrowser) return;
		const el = this.galleryEl?.nativeElement;
		if (!el) return;
		el.addEventListener('touchstart', this._boundTouchStart, { passive: true });
		el.addEventListener('touchend', this._boundTouchEnd, { passive: true });
	}

	ngOnDestroy(): void {
		const el = this.galleryEl?.nativeElement;
		if (!el) return;
		el.removeEventListener('touchstart', this._boundTouchStart);
		el.removeEventListener('touchend', this._boundTouchEnd);
	}

	private _onTouchStart(e: TouchEvent): void {
		this._touchStartX = e.changedTouches[0].clientX;
	}

	private _onTouchEnd(e: TouchEvent): void {
		this._touchEndX = e.changedTouches[0].clientX;
		const delta = this._touchStartX - this._touchEndX;
		if (Math.abs(delta) > 50) {
			delta > 0 ? this.nextImage() : this.previousImage();
		}
	}

	navigateToList(): void {
		this._router.navigate(['/list']);
	}

	navigateToProject(id: number): void {
		this._router.navigate(['/profile', id], { replaceUrl: true });
		this.selectedImageIndex.set(0);
		if (this._isBrowser) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	selectImage(index: number): void {
		this.selectedImageIndex.set(index);
	}

	nextImage(): void {
		const p = this.project();
		if (!p || !p.images) return;
		this.selectedImageIndex.update((i) => (i + 1) % p.images!.length);
	}

	previousImage(): void {
		const p = this.project();
		if (!p || !p.images) return;
		this.selectedImageIndex.update((i) => (i === 0 ? p.images!.length - 1 : i - 1));
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

	getInitials(name: string): string {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
}
