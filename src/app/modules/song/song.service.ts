import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Song, SongRequest, SongResponse } from './song.interface';
import { environment } from 'src/environments/environment';
import { Album } from '../album/album.interface';

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

  getFile(_id: string){
    return `${this.ENDPOINT}/${_id}/file`;
  }

  get(_id: string){
    return this.http.get<Song | SongResponse | { song: Song, artist: string }>(`${this.ENDPOINT}/${_id}`, { headers: this.headers }).pipe(
      map(song => {
        const SONG = song as Song;
        const _song = song as SongResponse;
        const _artist = _song.album.artist;
        SONG.album = _song.album._id;
        return { song: SONG, artist: _artist };
      }),
    )
  }

  update(_id: string, body: SongRequest){
    return this.http.put<Song>(`${this.ENDPOINT}/${_id}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }

  updateFile(_id: string, file: File){
    const fd = new FormData();
    fd.append("file", file, file.name);

    return this.http.post<Album>(`${this.ENDPOINT}/${_id}/file`, fd, { headers: this.headers }).pipe(
      catchError(this.catchError)
    )
  }

  add(body: SongRequest){
    return this.http.post<Song>(`${this.ENDPOINT}`, body, { headers: this.headers }).pipe(
      catchError(this.catchError)
    );
  }
}
