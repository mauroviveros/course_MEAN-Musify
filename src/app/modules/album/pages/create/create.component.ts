import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AlbumRequest } from '../../album.interface';

@Component({
  selector: 'album-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(
    private router: Router,
    // private artistService: ArtistService
  ){}

  public submitData(data: AlbumRequest){
    Swal.fire("creando Album", undefined, "info");
    Swal.showLoading();
    // this.artistService.add(data as ArtistRequest).subscribe(response => {
    //   if(typeof response === "string") return Swal.fire("creando Artista", response, "error");
    //   Swal.fire("creando Artista", "Artista creado correctamente", "success");
    //   return this.router.navigate(["artist", response._id]);
    // })
  }
}
