import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<{ accessToken: string }> {
    return this._http.post<{ accessToken: string }>(
      'http://localhost:3000/login',
      {
        username,
        password,
      }
    );
  }

  register(username: string, password: string): Observable<any> {
    return this._http.post('http://localhost:3000/register', {
      username,
      password,
    });
  }
}
