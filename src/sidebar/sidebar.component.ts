import { AsyncPipe, NgIf } from '@angular/common';
import { BREAKPOINTS_TOKEN } from '@shared/injection-tokens';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IBreakpointStatus } from '@shared/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { TextWithIconComponent } from '@shared/components/text-with-icon/text-with-icon.component';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    NgIf,
    TextWithIconComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  sidebarItems = [
    { icon: 'post_add', label: 'Add section', action: this.addSection },
    { icon: 'swap_vert', label: 'Rearrange', action: this.rearrange },
    { icon: 'view_comfy', label: 'Templates', action: this.showTemplates },
    { icon: 'download', label: 'Download', action: this.download },
  ];

  constructor(
    @Inject(BREAKPOINTS_TOKEN)
    public breakpoints$: Observable<IBreakpointStatus>
  ) {}

  addSection() {
    console.log('Add section');
  }

  rearrange() {
    console.log('Rearrange');
  }

  showTemplates() {
    console.log('Templates');
  }

  download() {
    console.log('Download');
  }
}
