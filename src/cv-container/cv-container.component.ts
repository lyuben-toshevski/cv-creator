import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { SectionsContainerComponent } from './sections-container/sections-container.component';
import { TwoColumnsLayoutComponent } from '@shared/layouts';

@Component({
  selector: 'app-cv-container',
  standalone: true,
  imports: [
    HeaderSectionComponent,
    SectionsContainerComponent,
    TwoColumnsLayoutComponent,
  ],
  templateUrl: './cv-container.component.html',
  styleUrl: './cv-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvContainerComponent {}
