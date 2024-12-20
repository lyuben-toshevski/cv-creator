import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  EditableTextDirective,
  TextContentChangeDirective,
} from '@shared/directives';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ImagePickerComponent } from '@shared/components';

enum InfoType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
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
export class HeaderSectionComponent {
  InfoType = InfoType;
  info = {
    [InfoType.PRIMARY]: [
      {
        value: 'Toshevski',
        key: 'name',
        label: 'Name',
      },
      {
        key: 'jobTitle',
        value: 'Software Engineer',
        label: 'Job Title',
      },
    ],
    [InfoType.SECONDARY]: [
      {
        key: 'phone',
        value: '+35988723435',
        label: 'Phone',
        icon: 'phone_enabled',
      },
      {
        key: 'email',
        value: 'toshevski@gmail.com',
        label: 'Email',
        icon: 'alternate_email',
      },
      {
        key: 'location',
        value: 'Remote',
        label: 'Location',
        icon: 'location_on',
      },
      {
        key: 'portfolio',
        value: 'linkedin.com',
        label: 'Portfolio',
        icon: 'link',
      },
    ],
  };

  showImagePicker = true;

  private _updatedInfo = { ...this.info };

  constructor(@Inject(IS_MOBILE_TOKEN) public isMobile$: Observable<boolean>) {}

  onCancelEditing(): void {
    this._updatedInfo = { ...this.info };
  }

  onFinishEditing(): void {
    this.info = { ...this._updatedInfo };
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
