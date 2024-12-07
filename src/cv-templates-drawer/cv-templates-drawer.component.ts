import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { CanvasService } from '@shared/services';
import { TwoColumnsTemplateComponent } from 'src/cv-templates/two-columns-template/two-columns-template.component';

@Component({
  selector: 'app-cv-templates-drawer',
  standalone: true,
  imports: [MatSidenavModule, NgClass, MatRipple],
  templateUrl: './cv-templates-drawer.component.html',
  styleUrl: './cv-templates-drawer.component.scss',
})
export class CvTemplatesDrawerComponent implements AfterViewInit {
  @Output() selectTemplate = new EventEmitter<ComponentRef<any>>();

  @ViewChild('drawer', { static: false })
  public drawer!: MatDrawer;

  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: false })
  private _dynamicComponent!: ViewContainerRef;

  templates: Array<{
    componentRef: ComponentRef<any>;
    base64ImageString: string;
    title: string;
  }> = [];

  private _views = [
    { component: TwoColumnsTemplateComponent, title: 'Two Columns' },
  ];

  constructor(
    private _canvasService: CanvasService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this._generateTemplates();
  }

  templateSelect(component: ComponentRef<any>): void {
    this.selectTemplate.emit(component);
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
      template.component
    );

    this._cdr.detectChanges();

    this._canvasService
      .generateCanvasAsImageString(componentRef.location.nativeElement)
      .subscribe({
        next: (imageString) => {
          this.templates.push({
            componentRef,
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
