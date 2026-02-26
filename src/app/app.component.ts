import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Import RouterLink
import { ThemeService } from 'wacom';

@Component({
	selector: 'app-root',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet], // Add imports here
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	private _themeService = inject(ThemeService);

	constructor() {
		this._themeService.init();
	}
}
