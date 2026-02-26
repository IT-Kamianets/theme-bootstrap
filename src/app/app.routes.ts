import { Routes } from '@angular/router';
import { PublicComponent } from './layouts/public/public.component';
import { ContentComponent } from './pages/content/content.component';
import { FormPageComponent } from './pages/form/form.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component'; // Verify your exact path/filename
import { ListComponent } from './pages/list/list.component';
import { TablePageComponent } from './pages/table/table.component';

export const routes: Routes = [
	{
		path: '',
		component: PublicComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'list', component: ListComponent },
			{ path: 'gallery', component: GalleryComponent },
			{ path: 'content', component: ContentComponent },
			{ path: 'form', component: FormPageComponent },
			{ path: 'table', component: TablePageComponent },
			{
				path: 'profile/:id',
				loadComponent: () =>
					import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
			},
			{ path: 'profile', redirectTo: 'profile/1', pathMatch: 'full' },
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];
