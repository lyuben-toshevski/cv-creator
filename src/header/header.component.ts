import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditableTextDirective } from '../shared/directives/editable-text.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [EditableTextDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
