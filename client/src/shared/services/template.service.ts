import { Injectable, Type } from '@angular/core';
import { TemplateType } from '@shared/enums';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TwoColumnsTemplateComponent } from '@shared/components/cv-templates/two-columns-template/two-columns-template.component';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  templatesMap = {
    [TemplateType.TWO_COLUMNS]: TwoColumnsTemplateComponent,
  };

  private _selectedTemplate$ = new BehaviorSubject<Type<unknown>>(
    this.templatesMap[TemplateType.TWO_COLUMNS]
  );

  getSelectedTemplate(): Observable<Type<unknown>> {
    return of(this._selectedTemplate$.getValue());
  }

  getComponentByType(templateType: TemplateType): Type<unknown> {
    return this.templatesMap[templateType];
  }

  selectTemplate(type: TemplateType): void {
    this._selectedTemplate$.next(this.templatesMap[type]);
  }
}
