import { Component } from '@angular/core';
import { SectionsContainerComponent } from '../sections-container/sections-container.component';
import { HeaderComponent } from '../header/header.component';
import { BaseLayoutComponent } from '@shared/layouts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BaseLayoutComponent,
    HeaderComponent,
    SectionsContainerComponent,
    HeaderComponent,
    BaseLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cv-creator';
}
