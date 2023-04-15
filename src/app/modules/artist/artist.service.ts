import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';

import { Artist, ArtistList, ArtistPagination, ArtistRequest } from "./artist.interface";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private ENDPOINT: string = `${environment.ENDPOINT}/artists`;
  private headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");

  private pagination: ArtistPagination = {
    page: 1,
    limit: 3
  }

  constructor(
    private http: HttpClient
  ) { }

  private catchError(err: HttpErrorResponse){
    let message: string = "Ah ocurrido un error";
    if(err.error.error) message = err.error.error.message;
    return of(message);
  };

  getImg(_id: string){
    return `${this.ENDPOINT}/${_id}/image`;
  }

  getList(pagination?: ArtistPagination){
    const params = new HttpParams()
      .set("page", this.pagination.page)
      .set("limit", this.pagination.limit);
    return this.http.get<ArtistList>(`${this.ENDPOINT}`, { headers: this.headers, params });
  }

  get(_id: string){
    return this.http.get<Artist>(`${this.ENDPOINT}/${_id}`, { headers: this.headers });
  }

  update(_id: string, body: ArtistRequest){
    return this.http.put<Artist>(`${this.ENDPOINT}/${_id}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }

  updateIMG(_id: string, file: File){
    const fd = new FormData();
    fd.append("image", file, file.name);

    return this.http.post<Artist>(`${this.ENDPOINT}/${_id}/image`, fd, { headers: this.headers }).pipe(
      catchError(this.catchError)
    )
  }


  add(body: ArtistRequest){
    return this.http.post<Artist>(`${this.ENDPOINT}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }
}
