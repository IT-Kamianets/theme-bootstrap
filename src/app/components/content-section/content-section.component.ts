import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-content-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './content-section.component.html',
	styleUrl: './content-section.component.css',
})
export class ContentSectionComponent {}
