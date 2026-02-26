import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-gallery-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './gallery-section.component.html',
	styleUrl: './gallery-section.component.css',
})
export class GallerySectionComponent {}
