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

  constructor(){}


  play(song: Song){
    this._song.next(song);
  }
}
