import { Component, Input } from '@angular/core';
import { Song } from '../../song.interface';
import { SongService } from '../../song.service';
import { map } from 'rxjs';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'song-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() album?: string;
  songs: Song[] = [];

  constructor(
    private player: PlayerService,
    private songService: SongService
  ){}

  ngOnInit(){
    if(!this.album) return;

    this.songService.getList(this.album, 1, true).pipe(
      map(response => {
        response.docs = response.docs.sort((song1, song2) => song1.number - song2.number)
        return response;
      })
    ).subscribe(({ docs }) => {
      this.songs = docs;
    })
  }

  play(song: Song){
    this.player.play(song);
  }

  remove(song: Song){
    this.songService.remove(song).subscribe(_ => {
      this.songs.splice(this.songs.indexOf(song), 1);
    })
  }
}
