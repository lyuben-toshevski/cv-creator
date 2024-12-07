import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CvState } from '@store/cv/cv.reducer';
import { selectTemplate } from '@store/cv/cv.selectors';
import { filter } from 'rxjs';

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
    private _store: Store<CvState>
  ) {}

  ngAfterViewInit(): void {
    // TODO: add FE layer-ing, make the presentation layer dumber and the data interactions to happen only in the screen component
    this._store
      .select(selectTemplate)
      .pipe(filter((v) => !!v))
      .subscribe((view) => {
        this._updateTemplate(view);
      });
  }

  private _updateTemplate(view: Type<unknown> | null): void {
    if (view) {
      this._dynamicComponentContainer.clear();
      this._dynamicComponentContainer.createComponent(view);
      this._cdr.detectChanges();
    }
  }
}
