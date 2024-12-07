import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TwoColumnsLayoutComponent } from '@shared/layouts';
import { HeaderSectionComponent } from 'src/cv-container/header-section/header-section.component';
import { SectionsContainerComponent } from 'src/cv-container/sections-container/sections-container.component';

@Component({
  selector: 'app-two-columns-template',
  standalone: true,
  imports: [
    HeaderSectionComponent,
    SectionsContainerComponent,
    TwoColumnsLayoutComponent,
  ],
  templateUrl: './two-columns-template.component.html',
  styleUrl: './two-columns-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoColumnsTemplateComponent {}