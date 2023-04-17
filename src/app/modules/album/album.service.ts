import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, from, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album, AlbumList, AlbumRequest } from './album.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private ENDPOINT: string = `${environment.ENDPOINT}/albums`;
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

  getList(page: number = 1, all?: boolean){
    let params = new HttpParams().set("page", page);
    if(!all) params = params.set("limit", this.limit);

    return this.http.get<AlbumList>(`${this.ENDPOINT}`, { headers: this.headers, params });
  }

  get(_id: string){
    return this.http.get<Album>(`${this.ENDPOINT}/${_id}`, { headers: this.headers });
  }

  update(_id: string, body: AlbumRequest){
    return this.http.put<Album>(`${this.ENDPOINT}/${_id}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }

  updateIMG(_id: string, file: File){
    const fd = new FormData();
    fd.append("image", file, file.name);

    return this.http.post<Album>(`${this.ENDPOINT}/${_id}/image`, fd, { headers: this.headers }).pipe(
      catchError(this.catchError)
    )
  }


  add(body: AlbumRequest){
    return this.http.post<Album>(`${this.ENDPOINT}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }

  remove(album: Album){
    return from(Swal.fire({
      title: "Borrando Album",
      text: `Esta seguro que desea borrar el album: ${album.name}?`,
      icon: "question",
      showCancelButton: true,
    })).pipe(
      filter(result => result.isConfirmed),
      switchMap(() => this.http.delete<Album>(`${this.ENDPOINT}/${album._id}`, { headers: this.headers })),
      tap(() => Swal.fire({ title: "Borrando Album", text: `Album: ${album.name}. Borrado correctamente`, icon: "success", })),
      catchError(this.catchError)
    );
  }
}
