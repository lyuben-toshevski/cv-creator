import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appEditableText]',
  standalone: true,
})
export class EditableTextDirective {
  @Output() finishEditing = new EventEmitter<void>();
  @Output() cancelEditing = new EventEmitter<void>();

  @HostListener('click', ['$event']) onClick(event: KeyboardEvent) {
    this._isParagraphTarget = event.target instanceof HTMLParagraphElement;
    this._eventTarget = event.target as HTMLElement;
    if (!this._isEditing) {
      this.makeEditable();
    }
  }

  @HostListener('focus') onFocus() {
    if (this._isEditing) {
      this.showOverlay();
    }
  }

  @HostListener('blur') onBlur() {
    if (this._isEditing) {
      this.saveChanges();
      this.hideOverlay();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Allow Enter key only for paragraph elements
    if (event.key === 'Enter') {
      console.log(this._isParagraphTarget);

      if (this._isEditing && !this._isParagraphTarget) {
        event.preventDefault();
        this.el.nativeElement.blur();
      } else if (!this._isEditing) {
        event.preventDefault(); // Prevent inserting a new line
        this.makeEditable();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelChanges();
      this.hideOverlay();
    } else if (event.key === 'Backspace') {
      // Bug
      console.log(this._eventTarget.innerText.split('\n'));

      if (this._eventTarget.innerText.trim() === '' || this.isCaretAtStart()) {
        event.preventDefault();
      }
    }
  }
  private _isEditing = false;
  private _overlay: HTMLElement = this.renderer.createElement('div');
  private _isParagraphTarget = false;
  private _eventTarget: HTMLElement = {} as HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0'); // Make the element focusable
  }

  private makeEditable() {
    this._isEditing = true;
    const element = this.el.nativeElement;
    this.renderer.setAttribute(element, 'contenteditable', 'true');
    element.focus();
    this.showOverlay();
  }

  private saveChanges() {
    this._isEditing = false;
    const element = this.el.nativeElement;
    this.renderer.removeAttribute(element, 'contenteditable');
    this.finishEditing.emit();
  }

  private cancelChanges() {
    this._isEditing = false;
    const element = this.el.nativeElement;
    this.renderer.removeAttribute(element, 'contenteditable');
    this.renderer.setProperty(element, 'innerText', element.innerText); // Revert to original text
    this.cancelEditing.emit();
  }

  private showOverlay() {
    const body = document.body;
    this.renderer.addClass(this._overlay, 'overlay');
    // Insert _overlay in the body
    this.renderer.appendChild(body, this._overlay);
    // Add focused class to the editable element
    this.renderer.addClass(this.el.nativeElement, 'focused');
  }

  private hideOverlay() {
    // Remove _overlay
    if (this._overlay) {
      this.renderer.removeChild(document.body, this._overlay);
    }
    // Remove focused class from the editable element
    this.renderer.removeClass(this.el.nativeElement, 'focused');
  }

  private isCaretAtStart(): boolean {
    const selection = window.getSelection();
    if (selection?.rangeCount && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range.startOffset === 1 && range.endOffset === 1;
    }
    return false;
  }
}
