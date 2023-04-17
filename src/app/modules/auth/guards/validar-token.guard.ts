import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard{

  constructor(
    private auth: AuthService,
    private router: Router
  ){};

  private _validarToken(){
    return of(localStorage.getItem("token")).pipe(
      map(token => !token ? this.router.parseUrl("/auth/login") : token),
      switchMap(response => typeof response === "string" ? this.auth.getUser() : of(response)),
      map(valid => valid === true ? true : this.router.parseUrl("/auth/login"))
    );
  }

  canActivate(): Observable<UrlTree | boolean> {
    return this._validarToken();
  }
  canLoad(): Observable<UrlTree | boolean> {
    return this._validarToken();
  }
}
