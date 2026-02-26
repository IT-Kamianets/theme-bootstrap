import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-content-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './content-section.html',
  styleUrl: './content-section.css',
})
export class ContentSection {

}
