import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, of } from 'rxjs';

import { Artist, ArtistRequest } from "./artist.interface";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private ENDPOINT: string = environment.ENDPOINT;

  constructor(
    private http: HttpClient
  ) { }

  private catchError(err: HttpErrorResponse){
    let message: string = "Ah ocurrido un error";
    if(err.error.error) message = err.error.error.message;
    return of(message);
  };


  add(body: ArtistRequest){
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");
    return this.http.post<Artist>(`${this.ENDPOINT}/artists`, body, { headers }).pipe(
      map(_ => true),
      catchError(this.catchError)
    );
  }
}
