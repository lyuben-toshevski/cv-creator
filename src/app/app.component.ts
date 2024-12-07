import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { selectUser } from '@store/auth/auth.selectors';
import { HeaderComponent } from 'src/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private _store: Store<AuthState>) {
    this._store.select(selectUser).subscribe((state) => {
      console.log('users', state);
    });
  }
}
