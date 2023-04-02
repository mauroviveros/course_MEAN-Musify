import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard{

  constructor(
    private _auth: AuthService,
    private _router: Router
  ){};

  private _validarToken(){
    return this._auth.getUser().pipe(
      tap(valid => {
        if(valid === true) return;
        this._router.navigate(["/login"]);
      })
    )

  }

  canActivate(): Observable<string | boolean> {
    return this._validarToken();
  }
  canLoad(): Observable<string | boolean> {
    return this._validarToken();
  }
}
