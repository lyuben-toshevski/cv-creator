import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-cv-container',
  standalone: true,
  imports: [],
  templateUrl: './cv-container.component.html',
  styleUrl: './cv-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvContainerComponent {
  @Input('template') set template(componentRef: ComponentRef<any>) {
    if (componentRef) {
      this._dynamicComponentContainer.clear();
      this._dynamicComponentContainer.insert(componentRef.hostView);
    }
  }
  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: false,
  })
  private _dynamicComponentContainer!: ViewContainerRef;
}
