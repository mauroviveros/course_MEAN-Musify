import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Song } from 'src/app/modules/song/song.interface';

@Component({
  selector: 'app-musify',
  templateUrl: './musify.component.html',
  styleUrls: ['./musify.component.scss']
})
export class MusifyComponent {
  song?: Song;

  constructor(
    private player: PlayerService
  ){
    this.player.song.subscribe(song => {
      this.song = song;
    })
  }
}
