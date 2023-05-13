import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Song } from 'src/app/modules/song/song.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _song = new BehaviorSubject<Song | null>(null);
  get song(){
    return this._song.pipe(
      filter(song => !!song),
      map(song => song as Song)
    );
  }

  constructor(){
    const song: Song = JSON.parse(window.localStorage.getItem("player") || "{}");
    if(song._id) this._song.next(song);
  }


  play(song: Song){
    window.localStorage.setItem("player", JSON.stringify(song));
    this._song.next(song);
  }
}
