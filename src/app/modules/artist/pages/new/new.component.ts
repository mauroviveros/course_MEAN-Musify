import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArtistService } from '../../artist.service';

import { ArtistRequest } from "../../artist.interface";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  public form = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private artistService: ArtistService
  ){}

  public submit(){
    if(this.form.invalid) return;

    Swal.fire("creando Artista", undefined, "info");
    Swal.showLoading();
    this.artistService.add(this.form.value as ArtistRequest).subscribe(response => {
      if(typeof response === "string") return Swal.fire("creando Artista", response, "error");
      return Swal.fire("creando Artista", "Artista creado correctamente", "success");
      // return this.router.navigate(["artist", response._id]);
    })
  }
}
