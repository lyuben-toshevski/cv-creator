import { AsyncPipe, NgIf } from '@angular/common';
import { BREAKPOINTS_TOKEN } from '@shared/injection-tokens';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
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
  @Output() rearrange = new EventEmitter<void>();
  @Output() addSection = new EventEmitter<void>();
  @Output() showTemplates = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();

  sidebarItems = [
    {
      icon: 'post_add',
      label: 'Add section',
      action: () => this.addSection.emit(),
    },
    {
      icon: 'swap_vert',
      label: 'Rearrange',
      action: () => this.rearrange.emit(),
    },
    {
      icon: 'view_comfy',
      label: 'Templates',
      action: () => this.showTemplates.emit(),
    },
    { icon: 'download', label: 'Download', action: () => this.download.emit() },
  ];

  constructor(
    @Inject(BREAKPOINTS_TOKEN)
    public breakpoints$: Observable<IBreakpointStatus>
  ) {}
}
