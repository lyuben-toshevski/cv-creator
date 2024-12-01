import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CvContainerComponent } from 'src/cv-container/cv-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CvContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
