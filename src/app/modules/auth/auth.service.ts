import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { environment } from '../../../environments/environment';
import { AuthResponse, User } from './interfaces/user';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT: string = environment.ENDPOINT;
  private USER: User = {} as User;

  public get user(): Readonly<User>{
    return this.USER;
  }

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){};

  private _tapResponse(resp: AuthResponse){
    if(resp.token) localStorage.setItem("token", resp.token);
    this.USER = resp.user;
  };

  private _catchError(err: HttpErrorResponse){
    let message: string = "Ah ocurrido un error";
    if(err.error.error) message = err.error.error.message;
    return of(message);
  };

  getUser(){
    if(this.user._id) return of(true);

    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");
    return this._http.get<AuthResponse>(`${this.ENDPOINT}/user`, { headers }).pipe(
      tap(resp => this._tapResponse(resp)),
      map(_ => true),
      catchError(this._catchError)
    );
  };

  login(email: string, password: string, hash?: boolean){
    const body = { email, password, hash };
    return this._http.post<AuthResponse>(`${this.ENDPOINT}/login`, body).pipe(
      tap(resp => this._tapResponse(resp)),
      map(_ => true),
      catchError(this._catchError)
    );
  };

  logout(){
    localStorage.removeItem("token");
    this.USER = {} as User;
    this._router.navigate(["login"]);
  }
};
