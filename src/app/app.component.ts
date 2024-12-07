import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfPreviewComponent } from '@shared/components/pdf-preview/pdf-preview.component';
import { IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { PdfService } from '@shared/services';
import { Observable } from 'rxjs';
import { CvContainerComponent } from 'src/cv-container/cv-container.component';
import { HeaderComponent } from 'src/header/header.component';
import { SidebarComponent } from 'src/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CvContainerComponent,
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
  @ViewChild('cvContainer', { static: false, read: ElementRef })
  cvContainer!: ElementRef;

  constructor(
    @Inject(IS_MOBILE_TOKEN) public isMobile$: Observable<boolean>,
    private _pdfService: PdfService,
    private _dialog: MatDialog
  ) {}

  exportToPdf(): void {
    this._pdfService.exportToPDF(this.cvContainer.nativeElement, `cv`);
  }

  generatePDFPreview(): void {
    this._dialog.open(PdfPreviewComponent, {
      width: '100%',
      panelClass: 'overflow-scroll',
    });
  }
}
