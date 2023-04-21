import { Component } from '@angular/core';
import { Song, SongRequest } from '../../song.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'song-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  artist?: string;
  album?: string;
  song?: Song;

  constructor(
    private route: ActivatedRoute
  ){
    this.route.queryParams.subscribe(({ artist, album }) => {
      this.artist = artist;
      this.album = album;
    });
  }

  submitData(data: SongRequest){}
}
