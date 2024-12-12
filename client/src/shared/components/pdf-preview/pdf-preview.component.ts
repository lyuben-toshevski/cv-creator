import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './pdf-preview.component.html',
  styleUrl: './pdf-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfPreviewComponent implements AfterViewInit {
  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: false,
  })
  private _dynamicComponentContainer!: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<PdfPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { component: Type<unknown> },
    private _cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this._loadDynamicComponent(this.data.component);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  private _loadDynamicComponent(component: Type<unknown>): void {
    this._dynamicComponentContainer.clear();
    this._dynamicComponentContainer.createComponent(component);
    this._cdr.detectChanges();
  }
}
