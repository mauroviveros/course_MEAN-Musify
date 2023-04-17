import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Album, AlbumRequest } from '../../album.interface';
import { Artist } from 'src/app/modules/artist/artist.interface';
import { ArtistService } from 'src/app/modules/artist/artist.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'album-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  artists: Artist[] = [];
  @Input() album?: Album;
  @Input() actionText?: string;
  @Input("artist") artistSelected?: string;
  @Output() submitted = new EventEmitter<AlbumRequest>();

  public form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    year: [null, [Validators.required, Validators.min(0)]],
    artist: ["", [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private artistService: ArtistService
  ){
    Swal.fire("obteniendo Artista", undefined, "info");
    Swal.showLoading();
    this.artistService.getList(1, true).subscribe(({ docs }) => {
      this.artists = docs;
      const exist = this.artists.find(({_id}) => _id === this.artistSelected);
      if(!exist) this.router.navigate([], { queryParams: { artist: null } });
      Swal.close();
    });
  }

  ngOnChanges(){
    if(this.album?.name) this.form.controls["name"].setValue(this.album.name);
    if(this.album?.description) this.form.controls["description"].setValue(this.album.description);
    if(this.album?.year) this.form.controls["year"].setValue(this.album.year);

    if(this.artistSelected){
      this.form.controls["artist"].setValue(this.artistSelected);
      this.form.controls["artist"].disable();
    } else{
      this.form.controls["artist"].setValue(this.album?.artist || "");
      this.form.controls["artist"].enable();
    }
  }

  public submit(){
    if(this.form.invalid) return;
    this.submitted.emit(this.form.getRawValue() as AlbumRequest);
  }
}
