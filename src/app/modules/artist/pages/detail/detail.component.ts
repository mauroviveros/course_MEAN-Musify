import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../artist.service';
import { Artist, ArtistRequest } from '../../artist.interface';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'artist-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public artist?: Artist;

  public get img(){
    return (this.artist?._id ? this.artistService.getImg(this.artist._id) : null)
  }

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ){
    Swal.fire("obteniendo Artista", undefined, "info");
    Swal.showLoading();

    this.artistService.get(this.route.snapshot.paramMap.get("_id") as string).subscribe(response => {
      Swal.close();
      this.artist = response;
    });
  }
}
