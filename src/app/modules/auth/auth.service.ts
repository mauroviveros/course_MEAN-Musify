import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { environment } from '../../../environments/environment';
import { AuthReqest, AuthResponse, User } from './interfaces/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  private userSubject = new BehaviorSubject<User>(this.user);
  public user$ = this.userSubject.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){};

  private _tapResponse(resp: AuthResponse){
    if(resp.token) localStorage.setItem("token", resp.token);
    this.USER = resp.user;
    this.userSubject.next(this.USER);
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

  imgProfileURL(){
    return `${this.ENDPOINT}/user/${this.user._id}/image`;
  }

  updateUser(body:AuthReqest){
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");
    return this._http.put<AuthResponse>(`${this.ENDPOINT}/user`, body, { headers }).pipe(
      tap(resp => this._tapResponse(resp)),
      map(_ => true),
      catchError(this._catchError)
    )
  };

  updateUserIMG(file: File){
    const fd = new FormData();
    fd.append("image", file, file.name);

    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");
    return this._http.put<AuthResponse>(`${this.ENDPOINT}/user/${this.user._id}/image`, fd, { headers }).pipe(
      tap(resp => this._tapResponse(resp)),
      map(_ => true),
      catchError(this._catchError)
    )

  }

  login(email: string, password: string, hash?: boolean){
    const body = { email, password, hash };
    return this._http.post<AuthResponse>(`${this.ENDPOINT}/login`, body).pipe(
      tap(resp => this._tapResponse(resp)),
      map(_ => true),
      catchError(this._catchError)
    );
  };

  register(body:AuthReqest){
    return this._http.post<AuthResponse>(`${this.ENDPOINT}/register`, body).pipe(
      tap(resp => this._tapResponse(resp)),
      map(_ => true),
      catchError(this._catchError)
    );
  };

  logout(){
    localStorage.removeItem("token");
    this.USER = {} as User;
    this._router.navigate(["login"]);
  };

  hasAdminRole(){
    return this.user.role === "ADMIN";
  };
};
