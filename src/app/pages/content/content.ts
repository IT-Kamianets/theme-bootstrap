import { Component } from '@angular/core';

@Component({
	selector: 'app-content',
	imports: [],
	templateUrl: './content.html',
	styleUrl: './content.css',
})
export class Content {
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
