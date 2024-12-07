import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { TemplateType } from '@shared/enums';
import { CanvasService, TemplateService } from '@shared/services';

@Component({
  selector: 'app-cv-templates-drawer',
  standalone: true,
  imports: [MatSidenavModule, NgClass, MatRipple],
  templateUrl: './cv-templates-drawer.component.html',
  styleUrl: './cv-templates-drawer.component.scss',
})
export class CvTemplatesDrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { static: false })
  public drawer!: MatDrawer;

  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: false })
  private _dynamicComponent!: ViewContainerRef;

  templates: Array<{
    base64ImageString: string;
    title: string;
  }> = [];

  private _views = [{ type: TemplateType.TWO_COLUMNS, title: 'Two Columns' }];

  constructor(
    private _canvasService: CanvasService,
    private _cdr: ChangeDetectorRef,
    private _templateService: TemplateService
  ) {}

  ngAfterViewInit(): void {
    this._generateTemplates();
  }

  templateSelect(index: number): void {
    this._templateService.selectTemplate(this._views[index].type);
    this.drawer.close();
  }

  private _generateTemplates(): void {
    // TODO: add loading spinner
    if (!this.templates.length) {
      // Clear any existing views
      this._dynamicComponent.clear();

      this._views.forEach((view) => {
        this._generateSingleTemplate(view);
      });
    }
  }

  private _generateSingleTemplate(template: any): void {
    const componentRef = this._dynamicComponent.createComponent(
      this._templateService.getComponentByType(TemplateType.TWO_COLUMNS)
    );

    this._cdr.detectChanges();

    this._canvasService
      .generateCanvasAsImageString(componentRef.location.nativeElement)
      .subscribe({
        next: (imageString) => {
          this.templates.push({
            base64ImageString: imageString,
            title: template.title,
          });
          componentRef.location.nativeElement.remove();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
