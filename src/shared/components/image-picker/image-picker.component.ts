import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { ImageBuffer } from '@shared/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [MatButtonModule, MatRippleModule, MatIconModule],
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePickerComponent {
  @Output() imagePicked = new EventEmitter<ImageBuffer>();
  @Output() imageRemoved = new EventEmitter<void>();

  thumbnail: ImageBuffer = 'assets/images/placeholder-profile.png';
  showImagePicker = true;

  constructor(private _cdr: ChangeDetectorRef) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnail = e.target?.result;
          this.imagePicked.emit(e.target?.result);
          this._cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file.');
      }
    }
  }
}
