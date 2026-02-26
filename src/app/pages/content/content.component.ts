import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './content.component.html',
	styleUrl: './content.component.css',
})
export class ContentComponent {
	scrollTo(event: Event, id: string): void {
		event.preventDefault();

		if (typeof document === 'undefined') {
			return;
		}

		const target = document.getElementById(id);
		if (!target) {
			return;
		}

		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}





