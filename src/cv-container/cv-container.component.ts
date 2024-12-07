import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TemplateService } from '@shared/services';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-cv-container',
  standalone: true,
  templateUrl: './cv-container.component.html',
  styleUrl: './cv-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvContainerComponent implements AfterViewInit {
  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: false,
  })
  private _dynamicComponentContainer!: ViewContainerRef;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _templateService: TemplateService
  ) {}

  ngAfterViewInit(): void {
    this._templateService.selectedTemplate$
      .pipe(
        filter((v) => !!v),
        distinctUntilChanged()
      )
      .subscribe((view) => {
        this._updateTemplate(view);
      });
  }

  private _updateTemplate(view: Type<unknown>): void {
    this._dynamicComponentContainer.clear();
    this._dynamicComponentContainer.createComponent(view);
    this._cdr.detectChanges();
  }
}
