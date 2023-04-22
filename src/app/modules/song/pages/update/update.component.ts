import { Component } from '@angular/core';
import { Song, SongRequest } from '../../song.interface';
import { SongService } from '../../song.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  artist?: string;
  song?: Song;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ){

    const _id = this.route.snapshot.paramMap.get("_id");
    if(!_id){
      this.router.navigate(["/"]);
      return;
    }

    Swal.fire("obteniendo Canción", undefined, "info");
    Swal.showLoading();

    this.songService.get(_id).subscribe({
      next: ({ song, artist }) => {
        this.song = song;
        this.artist = artist;
      },
      error: () => this.router.navigate(["/"])
    });
  }

  getFile(){
    return this.song ? this.songService.getFile(this.song._id): null;
  }

  updateFile(event:any){
    if(!this.song) return;

    Swal.fire("Actualizando archivo de la canción", undefined, "info");
    Swal.showLoading();

    this.songService.updateFile(this.song?._id, event.target?.files[0]).subscribe(response => {
      if(typeof response === "string") return Swal.fire("Actualizando archivo de la canción", response, "error");
      return Swal.fire("Actualizando archivo de la canción", "Archivo actualizado correctamente", "success");
    })
  };

  public submitData(data: SongRequest){
    if(!this.song) return;
    Swal.fire("actualizando Canción", undefined, "info");
    Swal.showLoading();

    this.songService.update(this.song._id, data as SongRequest).subscribe(response => {
      if(typeof response === "string") return Swal.fire("actualizando Canción", response, "error");
      Swal.fire("actualizando Canción", "Canción actualizada correctamente", "success");
      return this.router.navigate(["/album/" + response.album]);
    })
  }
}
