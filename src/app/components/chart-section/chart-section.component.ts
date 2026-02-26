import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-chart-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './chart-section.component.html',
	styleUrl: './chart-section.component.css',
})
export class ChartSectionComponent {}
