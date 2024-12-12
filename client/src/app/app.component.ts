import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { selectUser } from '@store/auth/auth.selectors';
import { map } from 'rxjs';
import { HeaderComponent } from 'src/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isAuthenticated$ = this._store.select(selectUser).pipe(map((user) => !!user));
  constructor(private _store: Store<AuthState>) {}
}