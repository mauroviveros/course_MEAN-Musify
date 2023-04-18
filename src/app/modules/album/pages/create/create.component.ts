import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AlbumService } from '../../album.service';

import { AlbumRequest } from '../../album.interface';

@Component({
  selector: 'album-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  artist?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ){
    this.route.queryParams.subscribe(({ artist }) => this.artist = artist);
  }

  public submitData(data: AlbumRequest){
    Swal.fire("creando Album", undefined, "info");
    Swal.showLoading();

    this.albumService.add(data).subscribe(response => {
      if(typeof response === "string") return Swal.fire("creando Album", response, "error");
      Swal.fire("creando Album", "Album creado correctamente.", "success");
      return this.router.navigate(["/album"]);
    })
  }
}
