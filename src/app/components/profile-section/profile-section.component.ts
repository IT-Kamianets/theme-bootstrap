import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-profile-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './profile-section.component.html',
	styleUrl: './profile-section.component.css',
})
export class ProfileSectionComponent {}
