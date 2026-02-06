import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-testimonials',
	imports: [],
	templateUrl: './testimonials.html',
	styleUrl: './testimonials.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {}
