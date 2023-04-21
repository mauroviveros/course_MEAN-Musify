import { Component } from '@angular/core';
import { Song, SongRequest } from '../../song.interface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SongService } from '../../song.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ){
    this.route.queryParams.subscribe(({ artist, album }) => {
      this.artist = artist;
      this.album = album;
    });
  }

  submitData(data: SongRequest){
    Swal.fire("creando Canción", undefined, "info");
    Swal.showLoading();

    this.songService.add(data).subscribe(response => {
      if(typeof response === "string") return Swal.fire("creando Canción", response, "error");
      Swal.fire("creando Canción", "Canción creada correctamente.", "success");

      return
      // return this.router.navigate(["/song/" + response._id + "/update"]);
    });
  }
}
