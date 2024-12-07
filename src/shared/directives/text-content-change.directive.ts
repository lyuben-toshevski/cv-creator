import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appTextContentChange]',
  standalone: true,
})
export class TextContentChangeDirective implements AfterViewInit {
  @Output() textChange = new EventEmitter<string>();
  private observer!: MutationObserver;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        this.emitTextContent();
      });
    });

    const config = { childList: true, subtree: true, characterData: true };

    this.observer.observe(this.elementRef.nativeElement, config);
  }

  private emitTextContent(): void {
    const textContent = this.elementRef.nativeElement.innerText;
    this.textChange.emit(textContent);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
