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
import { Store } from '@ngrx/store';
import { TemplateType } from '@shared/enums';
import { CanvasService, TemplateService } from '@shared/services';
import { selectTemplate } from '@store/cv/cv.actions';
import { CvState } from '@store/cv/cv.reducer';

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
    private _store: Store<CvState>,
    private _templateService: TemplateService
  ) {}

  ngAfterViewInit(): void {
    this._generateTemplates();
  }

  templateSelect(index: number): void {
    this._store.dispatch(
      selectTemplate({ selectedTemplateType: this._views[index].type })
    );
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

  private _generateSingleTemplate(template: {
    type: TemplateType;
    title: string;
  }): void {
    const componentRef = this._dynamicComponent.createComponent(
      this._templateService.getComponentByType(template.type)
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
