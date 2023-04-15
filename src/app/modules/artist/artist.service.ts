import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, filter, from, of, switchMap, tap } from 'rxjs';

import { Artist, ArtistList, ArtistPagination, ArtistRequest } from "./artist.interface";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private ENDPOINT: string = `${environment.ENDPOINT}/artists`;
  private headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") || "");

  private limit = 3;

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

  getList(page: number){
    const params = new HttpParams()
      .set("page", page)
      .set("limit", this.limit);
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

  remove(artist: Artist){
    return from(Swal.fire({
      title: "Borrando Artista",
      text: `Esta seguro que desea borrar el artista: ${artist.name}?`,
      icon: "question",
      showCancelButton: true,
    })).pipe(
      filter(result => result.isConfirmed),
      switchMap(() => this.http.delete<Artist>(`${this.ENDPOINT}/${artist._id}`, { headers: this.headers })),
      tap(() => Swal.fire({ title: "Borrando Artista", text: `Artista: ${artist.name}. Borrado correctamente`, icon: "success", })),
      catchError(this.catchError)
    );
  }
}
