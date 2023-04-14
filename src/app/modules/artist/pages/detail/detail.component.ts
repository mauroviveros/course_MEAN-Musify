import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../artist.service';
import { Artist, ArtistRequest } from '../../artist.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public artist?: Artist;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ){

    this.artistService.get(this.route.snapshot.paramMap.get("_id") as string).subscribe(response => {
      this.artist = response;
    });
  }

  public submitData(data: ArtistRequest){
    if(!this.artist) return;
    Swal.fire("actualizando Artista", undefined, "info");
    Swal.showLoading();
    this.artistService.update(this.artist._id, data as ArtistRequest).subscribe(response => {
      if(typeof response === "string") return Swal.fire("actualizando Artista", response, "error");
      return Swal.fire("actualizando Artista", "Artista actualizado correctamente", "success");
    })
  }

  public submitIMG(file: File){
    if(!this.artist) return;
    Swal.fire("actualizando IMG Artista", undefined, "info");
    Swal.showLoading();

    this.artistService.updateIMG(this.artist._id, file).subscribe(_ => {
      Swal.fire({
        title: "actualizando IMG Artista",
        text: "Foto de Artista actualizada correctamente",
        icon: "success"
      })
    })
  }
}
