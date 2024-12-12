import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '@shared/services';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { login, register } from '@store/auth/auth.actions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    NgIf,
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeScreenComponent {
  loginForm: FormGroup;
  isCreatingAccount = false;

  constructor(private _store: Store<AuthState>, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this._store.dispatch(login(this.loginForm.value));
    }
  }

  register() {
    if (this.loginForm.valid) {
      this._store.dispatch(register(this.loginForm.value));
      this.isCreatingAccount = false;
    }
  }
}
