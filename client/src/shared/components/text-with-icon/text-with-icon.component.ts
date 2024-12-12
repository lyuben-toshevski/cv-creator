import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TextContentChangeDirective } from '@shared/directives';

@Component({
  selector: 'app-text-with-icon',
  standalone: true,
  imports: [TextContentChangeDirective, MatIconModule],
  templateUrl: './text-with-icon.component.html',
  styleUrl: './text-with-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextWithIconComponent {
  @Input() icon?: string = '';
  @Input() text: string = '';
  @Output() onClick: () => void = () => {};
  @Output() textChange = new EventEmitter<string>();
}
