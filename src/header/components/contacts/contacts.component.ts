import { NgTemplateOutlet, NgIf, AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import {
  EditableTextDirective,
  TextContentChangeDirective,
} from '@shared/directives';
import { IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { IContact } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    AsyncPipe,
    EditableTextDirective,
    NgClass,
    NgIf,
    NgTemplateOutlet,
    TextContentChangeDirective,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  @Input() contacts: Array<IContact> = [];
  @Output() contactsChange = new EventEmitter<IContact>();
  @Output() finishEditing = new EventEmitter<void>();
  @Output() cancelEditing = new EventEmitter<void>();

  constructor(@Inject(IS_MOBILE_TOKEN) public isMobile$: Observable<boolean>) {}
}
