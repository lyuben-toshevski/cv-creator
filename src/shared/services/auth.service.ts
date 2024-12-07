import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string): Observable<any> {
    if (username === 'admin' && password === 'admin') {
      return of({ id: 1, name: 'Admin User' });
    }
    return of({ error: 'Invalid login' });
  }
}
