import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-final-cta',
	imports: [RouterLink],
	templateUrl: './final-cta.component.html',
	styleUrl: './final-cta.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCtaComponent {}
