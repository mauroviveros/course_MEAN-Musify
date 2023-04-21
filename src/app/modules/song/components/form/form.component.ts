import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Album } from 'src/app/modules/album/album.interface';
import { Song, SongRequest } from '../../song.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/modules/album/album.service';

@Component({
  selector: 'song-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  albums: Album[] = [];
  @Input() song?: Song;
  @Input() actionText?: string;
  @Input("artist") artistSelected?: string;
  @Input("album") albumSelected?: string;
  @Output() submitted = new EventEmitter<SongRequest>();

  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    number: [null, [Validators.required, Validators.min(1)]],
    duration: [null, [Validators.required]],
    album: ["", [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private albumService: AlbumService
  ){}

  ngOnInit(){
    Swal.fire("obteniendo Artista", undefined, "info");
    Swal.showLoading();
    if(!this.artistSelected) return;
    this.albumService.getList(this.artistSelected, 1, true).subscribe(({ docs }) => {
      this.albums = docs;
      const exist = this.albums.find(({_id}) => _id === this.albumSelected);
      if(!exist) this.router.navigate(["album", this.albumSelected]);
      Swal.close();
    })
  }

  ngOnChanges(){
    if(this.song?.name) this.form.controls["name"].setValue(this.song.name);
    if(this.song?.number) this.form.controls["number"].setValue(this.song.number);
    if(this.song?.duration) this.form.controls["duration"].setValue(this.song.duration);

    if(this.albumSelected){
      this.form.controls["album"].setValue(this.albumSelected);
      this.form.controls["album"].disable();
    } else{
      this.form.controls["album"].setValue(this.song?.album || "");
      this.form.controls["album"].enable();
    }
  }


  submit(){
    if(this.form.invalid) return;
    this.submitted.emit(this.form.getRawValue() as SongRequest);
  }
}
