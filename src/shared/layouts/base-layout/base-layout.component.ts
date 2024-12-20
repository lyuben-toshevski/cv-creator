import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent { }
