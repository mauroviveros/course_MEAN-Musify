import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";

import { environment } from '../../../environments/environment';
import { AuthResponse } from './interfaces/user';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT: string = environment.ENDPOINT;

  constructor(
    private _http: HttpClient
  ){};

  private _catchError(err: HttpErrorResponse){
    let message: string = "Ah ocurrido un error";
    if(err.error.error) message = err.error.error.message;
    return of(message);
  };

  login(email: string, password: string, hash?: boolean){
    const body = { email, password, hash };
    return this._http.post<AuthResponse>(`${this.ENDPOINT}/login`, body).pipe(
      map(_ => true),
      catchError(this._catchError)
    );
  };
};
