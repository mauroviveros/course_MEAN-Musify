import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Artist, ArtistRequest } from '../../artist.interface';

@Component({
  selector: 'artist-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() public artist?: Artist;
  @Input() actionText?: string;
  @Output() submitted = new EventEmitter<ArtistRequest>();

  public form = this.formBuilder.group({
    name: ["", [Validators.required]],
    description: ["", [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnChanges(){
    if(this.artist?.name) this.form.controls["name"].setValue(this.artist.name);
    if(this.artist?.description) this.form.controls["description"].setValue(this.artist.description);
  }

  public submit(){
    if(this.form.invalid) return;
    this.submitted.emit(this.form.value as ArtistRequest);
  }
}
