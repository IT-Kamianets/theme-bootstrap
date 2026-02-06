import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-showcase',
	imports: [],
	templateUrl: './showcase.html',
	styleUrl: './showcase.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase {}
