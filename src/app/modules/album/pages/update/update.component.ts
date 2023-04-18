import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { filter, finalize, of, switchMap, tap } from 'rxjs';
import { AlbumService } from '../../album.service';
import { Album, AlbumRequest } from '../../album.interface';

@Component({
  selector: 'album-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  album?: Album;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private albumService: AlbumService
  ){
    Swal.fire("obteniendo Album", undefined, "info");
    Swal.showLoading();

    of(this.auth.hasAdminRole()).pipe(
      tap(role => !role ? Swal.fire("obteniendo Album", "no tienes permisos para ver este album", "error") : null ),
      tap(role => !role ? this.router.navigate([""]) : null ),
      filter(role => role),
      switchMap(() => this.albumService.get(this.route.snapshot.paramMap.get("_id") as string)),
      finalize(() => Swal.close())
    ).subscribe({
      next: (album) => { this.album = album; },
      error: () => this.router.navigate(["/album"])
    });
  }

  getIMG(){
    return () => this.album ? this.albumService.getImg(this.album._id): null;
  }

  public submitData(data: AlbumRequest){
    if(!this.album) return;
    Swal.fire("actualizando Album", undefined, "info");
    Swal.showLoading();
    this.albumService.update(this.album._id, data as AlbumRequest).subscribe(response => {
      if(typeof response === "string") return Swal.fire("actualizando Album", response, "error");
      Swal.fire("actualizando Album", "Album actualizado correctamente", "success");
      return this.router.navigate(["/artist", response.artist]);
    })
  }

  public submitIMG(file: File){
    if(!this.album) return;
    Swal.fire("actualizando IMG Album", undefined, "info");
    Swal.showLoading();

    this.albumService.updateIMG(this.album._id, file).subscribe(_ => {
      Swal.fire({
        title: "actualizando IMG Album",
        text: "Foto de Album actualizada correctamente",
        icon: "success"
      })
    })
  }
}
