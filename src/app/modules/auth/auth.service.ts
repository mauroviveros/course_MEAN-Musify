import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT: string = environment.ENDPOINT;

  constructor(
    private _http: HttpClient
  ){};

  login(email: string, password: string){
    const body = { email, password };
    return this._http.post(`${this.ENDPOINT}/login`, body);
  }
};
