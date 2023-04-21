import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Song, SongRequest } from './song.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private ENDPOINT: string = `${environment.ENDPOINT}/songs`;
  private headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");
  private limit = 3;

  constructor(
    private http: HttpClient
  ){}

  private catchError(err: HttpErrorResponse){
    let message: string = "Ah ocurrido un error";
    if(err.error.error) message = err.error.error.message;
    return of(message);
  };


  add(body: SongRequest){
    return this.http.post<Song>(`${this.ENDPOINT}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }
}
