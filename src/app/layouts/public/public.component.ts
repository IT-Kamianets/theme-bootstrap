import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-public',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	templateUrl: './public.component.html',
	styleUrl: './public.component.css',
})
export class PublicComponent {}
