import { Routes } from '@angular/router';
import { Public } from './layouts/public/public';
import { Content } from './pages/content/content';
import { FormPage } from './pages/form/form';
import { Gallery } from './pages/gallery/gallery';
import { Home } from './pages/home/home'; // Verify your exact path/filename
import { List } from './pages/list/list';
import { TablePage } from './pages/table/table';

export const routes: Routes = [
	{
		path: '',
		component: Public,
		children: [
			{ path: '', component: Home },
			{ path: 'list', component: List },
			{ path: 'gallery', component: Gallery },
			{ path: 'content', component: Content },
			{ path: 'form', component: FormPage },
			{ path: 'table', component: TablePage },
			{
				path: 'profile/:id',
				loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
			},
			{ path: 'profile', redirectTo: 'profile/1', pathMatch: 'full' },
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];
