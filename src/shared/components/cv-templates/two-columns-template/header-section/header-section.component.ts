import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  EditableTextDirective,
  TextContentChangeDirective,
} from '@shared/directives';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ImagePickerComponent } from '@shared/components';
import { CvService, UtilService } from '@shared/services';
import { SectionType } from '@shared/enums';

enum InfoType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface IInfo {
  [InfoType.PRIMARY]: Array<{ value: string; key: string; label: string }>;
  [InfoType.SECONDARY]: Array<{
    value: string;
    key: string;
    label: string;
    icon: string;
  }>;
}

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [
    AsyncPipe,
    ContactsComponent,
    EditableTextDirective,
    ImagePickerComponent,
    NgIf,
    NgTemplateOutlet,
    TextContentChangeDirective,
  ],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSectionComponent implements OnInit {
  InfoType = InfoType;
  info!: IInfo;

  showImagePicker = true;

  private _updatedInfo!: IInfo;

  constructor(
    @Inject(IS_MOBILE_TOKEN) public isMobile$: Observable<boolean>,
    private _cvService: CvService
  ) {}

  ngOnInit(): void {
    this._cvService.getCvData().subscribe({
      next: (cvData) => {
        this.info = {
          [InfoType.PRIMARY]: [
            {
              value: cvData.personalDetails.name,
              key: 'name',
              label: 'Name',
            },
            {
              key: 'jobTitle',
              value: cvData.personalDetails.jobTitle,
              label: 'Job Title',
            },
          ],
          [InfoType.SECONDARY]: [
            {
              key: 'phone',
              value: cvData.personalDetails.phone,
              label: 'Phone',
              icon: 'phone_enabled',
            },
            {
              key: 'email',
              value: cvData.personalDetails.email,
              label: 'Email',
              icon: 'alternate_email',
            },
            {
              key: 'location',
              value: cvData.personalDetails.location,
              label: 'Location',
              icon: 'location_on',
            },
            {
              key: 'portfolio',
              value: cvData.personalDetails.portfolio,
              label: 'Portfolio',
              icon: 'link',
            },
          ],
        };

        this._updatedInfo = UtilService.deepCopy(this.info);
      },
    });
  }

  onCancelEditing(): void {
    this._updatedInfo = { ...this.info };
  }

  onFinishEditing(): void {
    this._cvService.updateCvData(SectionType.PERSONAL_DETAILS, {
      name: this._updatedInfo[InfoType.PRIMARY][0].value,
      jobTitle: this._updatedInfo[InfoType.PRIMARY][1].value,
      phone: this._updatedInfo[InfoType.SECONDARY][0].value,
      email: this._updatedInfo[InfoType.SECONDARY][1].value,
      location: this._updatedInfo[InfoType.SECONDARY][2].value,
      portfolio: this._updatedInfo[InfoType.SECONDARY][3].value,
    });
  }

  onInput(value: string, key: string, type: InfoType): void {
    const _entrytToUpdate = this._updatedInfo[type].find(
      (entry) => entry.key === key
    );

    if (_entrytToUpdate) {
      _entrytToUpdate.value = value;
    }
  }
}
