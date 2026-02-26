import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-table-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './table-section.component.html',
	styleUrl: './table-section.component.css',
})
export class TableSectionComponent {}
