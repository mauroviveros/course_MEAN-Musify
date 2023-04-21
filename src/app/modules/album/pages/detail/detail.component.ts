import { Component } from '@angular/core';
import { Album } from '../../album.interface';
import { AlbumService } from '../../album.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'album-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public album?: Album;

  public get img(){
    return (this.album?._id ? this.albumService.getImg(this.album._id) : null)
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ){
    Swal.fire("obteniendo Album", undefined, "info");
    Swal.showLoading();

    this.albumService.get(this.route.snapshot.paramMap.get("_id") as string).pipe(
      finalize(() => Swal.close())
    ).subscribe({
      next: response => { this.album = response; },
      error: () => { this.router.navigate(["/"]); }
    });
  }

  public remove(){
    if(!this.album) return;
    this.albumService.remove(this.album).subscribe(() => {
      this.router.navigate(["artist", this.album?.artist]);
    });
  }

  public edit(){
    this.router.navigate(["album", this.album?._id, "update"]);
  }

  public createSong(){
    this.router.navigate(["song", "create"], { queryParams: { album: this.album?._id, artist: this.album?.artist } });
  }
}
