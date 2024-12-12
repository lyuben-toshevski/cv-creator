import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-two-columns-layout',
  standalone: true,
  imports: [],
  templateUrl: './two-columns-layout.component.html',
  styleUrl: './two-columns-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoColumnsLayoutComponent {}
