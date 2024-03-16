import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

import {
  AuthResponse,
  LoginRequestBody,
} from '@shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly URL_API = 'http://localhost:3000/api/auth';
  private readonly TOKEN = 'token';

  constructor() {}

  login(body: LoginRequestBody) {
    return this.http.post<AuthResponse>(`${this.URL_API}/login`, body).pipe(
      tap(response => localStorage.setItem(this.TOKEN, response.token)),
      catchError((error: HttpErrorResponse) => throwError(() => error.error))
    );
  }
}
