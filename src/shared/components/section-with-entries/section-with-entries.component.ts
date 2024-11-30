import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EditableTextDirective } from '@shared/directives';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-section-with-entries',
  standalone: true,
  imports: [EditableTextDirective, MatDividerModule],
  templateUrl: './section-with-entries.component.html',
  styleUrl: './section-with-entries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWithEntriesComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() content: string = '';
  @Input() isInversedColors: boolean = false;
}
