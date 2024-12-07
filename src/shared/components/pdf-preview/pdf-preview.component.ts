import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CvContainerComponent } from '../../../cv-container/cv-container.component';

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CvContainerComponent,
  ],
  templateUrl: './pdf-preview.component.html',
  styleUrl: './pdf-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfPreviewComponent {
  constructor(public dialogRef: MatDialogRef<PdfPreviewComponent>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
