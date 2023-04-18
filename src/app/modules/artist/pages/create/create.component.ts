import { Component } from '@angular/core';
import { ArtistService } from '../../artist.service';

import { ArtistRequest } from "../../artist.interface";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'artist-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(
    private router: Router,
    private artistService: ArtistService
  ){}

  public submitData(data: ArtistRequest){
    Swal.fire("creando Artista", undefined, "info");
    Swal.showLoading();
    this.artistService.add(data as ArtistRequest).subscribe(response => {
      if(typeof response === "string") return Swal.fire("creando Artista", response, "error");
      Swal.fire("creando Artista", "Artista creado correctamente", "success");
      return this.router.navigate(["artist", response._id, "update"]);
    })
  }
}
