import { Injectable, Type } from '@angular/core';
import { TemplateType } from '@shared/enums';
import { BehaviorSubject, Observable } from 'rxjs';
import { TwoColumnsTemplateComponent } from 'src/cv-templates/two-columns-template/two-columns-template.component';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  templatesMap = {
    [TemplateType.TWO_COLUMNS]: TwoColumnsTemplateComponent,
  };

  _selectedTemplate$ = new BehaviorSubject<Type<unknown>>(
    this.templatesMap[TemplateType.TWO_COLUMNS]
  );

  get selectedTemplate$(): Observable<Type<unknown>> {
    return this._selectedTemplate$.asObservable();
  }

  getComponentByType(templateType: TemplateType): Type<unknown> {
    return this.templatesMap[templateType];
  }

  selectTemplate(type: TemplateType): void {
    this._selectedTemplate$.next(this.templatesMap[type]);
  }
}
