import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionWithEntriesComponent } from '../shared/components/section-with-entries/section-with-entries.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sections-container',
  standalone: true,
  imports: [SectionWithEntriesComponent, CommonModule],
  templateUrl: './sections-container.component.html',
  styleUrl: './sections-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsContainerComponent {
  sections = [
    { title: 'Section 1', subtitle: 'Subtitle 1', content: 'Content 1' },
    { title: 'Section 2', subtitle: 'Subtitle 2', content: 'Content 2' },
    { title: 'Section 3', subtitle: 'Subtitle 3', content: 'Content 3' },
    { title: 'Section 4', subtitle: 'Subtitle 4', content: 'Content 4' },
    { title: 'Section 5', subtitle: 'Subtitle 5', content: 'Content 5' },
  ];
  sectionsHalf = Math.ceil(this.sections.length / 2);
}
