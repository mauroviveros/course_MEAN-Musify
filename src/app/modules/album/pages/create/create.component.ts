import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ArtistService } from 'src/app/modules/artist/artist.service';

import { Album, AlbumRequest } from '../../album.interface';
import { Artist } from 'src/app/modules/artist/artist.interface';
import { finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'album-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  artist?: string;
  constructor(
    private route: ActivatedRoute
  ){
    this.route.queryParams.subscribe(({ artist }) => this.artist = artist);
  }

  public submitData(data: AlbumRequest){
    Swal.fire("creando Album", undefined, "info");
    Swal.showLoading();
    console.log(data);
    // this.artistService.add(data as ArtistRequest).subscribe(response => {
    //   if(typeof response === "string") return Swal.fire("creando Artista", response, "error");
    //   Swal.fire("creando Artista", "Artista creado correctamente", "success");
    //   return this.router.navigate(["artist", response._id]);
    // })
  }
}
