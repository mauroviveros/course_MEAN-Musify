import { Component, Input, ViewChild } from '@angular/core';
import { AlbumService } from 'src/app/modules/album/album.service';
import { Song } from 'src/app/modules/song/song.interface';
import { SongService } from 'src/app/modules/song/song.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'shared-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @ViewChild("audio") audio: any;
  @Input() song? : Song;

  constructor(
    private albumService: AlbumService,
    private songService: SongService
  ){}

  ngOnInit(){
    setTimeout(() => {
      this.audio.nativeElement.play();
    }, 100);
  }

  getImg(){
    if(!this.song) return;
    return this.albumService.getImg(this.song.album);
  }

  getFile(){
    if(!this.song) return;
    return this.songService.getFile(this.song._id);
  }
}
