import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../artist.service';
import { Artist } from '../../artist.interface';
import Swal from 'sweetalert2';
import { finalize, tap } from 'rxjs';

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
    private router: Router,
    private artistService: ArtistService
  ){
    Swal.fire("obteniendo Artista", undefined, "info");
    Swal.showLoading();

    this.artistService.get(this.route.snapshot.paramMap.get("_id") as string).pipe(
      finalize(() => Swal.close())
    ).subscribe({
      next: response => { this.artist = response; },
      error: () => { this.router.navigate(["/artist"]); }
    });
  }

  public remove(){
    if(!this.artist) return;
    this.artistService.remove(this.artist).subscribe(() => {
      this.router.navigate(["/artist"]);
    });
  }
}
