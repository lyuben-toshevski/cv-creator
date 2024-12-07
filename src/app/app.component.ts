import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfPreviewComponent } from '@shared/components/pdf-preview/pdf-preview.component';
import { IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { CanvasService } from '@shared/services';
import { Observable } from 'rxjs';
import { CvContainerComponent } from 'src/cv-container/cv-container.component';
import { CvTemplatesDrawerComponent } from 'src/cv-templates-drawer/cv-templates-drawer.component';
import { HeaderComponent } from 'src/header/header.component';
import { SidebarComponent } from 'src/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CvContainerComponent,
    CvTemplatesDrawerComponent,
    HeaderComponent,
    SidebarComponent,
    NgIf,
    AsyncPipe,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild(CvTemplatesDrawerComponent, { static: false })
  public cvTemplatesDrawer!: CvTemplatesDrawerComponent;

  @ViewChild('cvContainer', { static: false, read: ElementRef })
  private _cvContainer!: ElementRef;

  selectedTemplate!: ComponentRef<any>;

  constructor(
    @Inject(IS_MOBILE_TOKEN) public isMobile$: Observable<boolean>,
    private _canvasService: CanvasService,
    private _dialog: MatDialog
  ) {}

  exportToPdf(): void {
    this._canvasService.exportToPDF(this._cvContainer.nativeElement, `cv`);
  }

  generatePDFPreview(): void {
    this._dialog.open(PdfPreviewComponent, {
      width: '100%',
      panelClass: 'overflow-scroll',
    });
  }

  selectTemplate(template: ComponentRef<any>): void {
    console.log('template', template);

    this.selectedTemplate = template;
  }

  showTemplates() {
    this.cvTemplatesDrawer.drawer.toggle();
  }
}
