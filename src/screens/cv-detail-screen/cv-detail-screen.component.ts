import { NgIf, AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { CvContainerComponent } from './components/cv-container/cv-container.component';
import { CvTemplatesDrawerComponent } from './components/cv-templates-drawer/cv-templates-drawer.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PdfPreviewComponent, SidebarComponent } from '@shared/components';
import { IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { CanvasService } from '@shared/services';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cv-detail-screen',
  standalone: true,
  imports: [
    AsyncPipe,
    CvContainerComponent,
    CvTemplatesDrawerComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    NgIf,
    SidebarComponent,
  ],
  templateUrl: './cv-detail-screen.component.html',
  styleUrl: './cv-detail-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvDetailScreenComponent {
  @ViewChild(CvTemplatesDrawerComponent, { static: false })
  public cvTemplatesDrawer!: CvTemplatesDrawerComponent;

  @ViewChild('cvContainer', { static: false, read: ElementRef })
  private _cvContainer!: ElementRef;

  sidebarItems = [
    {
      icon: 'post_add',
      label: 'Add section',
      action: () => {},
    },
    {
      icon: 'swap_vert',
      label: 'Rearrange',
      action: () => {},
    },
    {
      icon: 'view_comfy',
      label: 'Templates',
      action: () => this.showTemplates(),
    },
    { icon: 'download', label: 'Download', action: () => this.exportToPdf() },
  ];

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
      data: {
        component: CvContainerComponent,
      },
    });
  }

  showTemplates() {
    this.cvTemplatesDrawer.drawer.toggle();
  }
}
