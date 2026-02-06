import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Import RouterLink
import { ThemeService } from 'wacom';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet], // Add imports here
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	private _themeService = inject(ThemeService);

	constructor() {
		this._themeService.init();
	}
}
