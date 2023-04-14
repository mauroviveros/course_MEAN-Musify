import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, of } from 'rxjs';

import { Artist, ArtistRequest } from "./artist.interface";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private ENDPOINT: string = `${environment.ENDPOINT}/artists`;
  private headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");

  constructor(
    private http: HttpClient
  ) { }

  private catchError(err: HttpErrorResponse){
    let message: string = "Ah ocurrido un error";
    if(err.error.error) message = err.error.error.message;
    return of(message);
  };

  getList(){
    return this.http.get<Artist>(`${this.ENDPOINT}`, { headers: this.headers });
  }

  get(_id: string){
    return this.http.get<Artist>(`${this.ENDPOINT}/${_id}`, { headers: this.headers });
  }

  update(_id: string, body: ArtistRequest){
    return this.http.put<Artist>(`${this.ENDPOINT}/${_id}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }


  add(body: ArtistRequest){
    return this.http.post<Artist>(`${this.ENDPOINT}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }
}
