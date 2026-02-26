import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
	selector: 'app-public',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, Header, Footer],
	templateUrl: './public.html',
	styleUrl: './public.css',
})
export class Public {}
