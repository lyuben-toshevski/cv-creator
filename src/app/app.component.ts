import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { Observable } from 'rxjs';
import { CvContainerComponent } from 'src/cv-container/cv-container.component';
import { HeaderComponent } from 'src/header/header.component';
import { SidebarComponent } from 'src/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CvContainerComponent,
    HeaderComponent,
    SidebarComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(@Inject(IS_MOBILE_TOKEN) public isMobile$: Observable<boolean>) {}
}
