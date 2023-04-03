import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @ViewChild("inputFile") inputFile: ElementRef = {} as ElementRef;

  public imageSrc: string | null = null;

  public get imgProfileURL (){
    return this.imageSrc || this._auth.imgProfileURL();
  }

  public form: FormGroup = this._formBuilder.group({
    name: [this._auth.user.name, [Validators.required]],
    surname: [this._auth.user.surname, [Validators.required]],
    email: [{ value: this._auth.user.email, disabled: true }]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService
  ){};

  openFile(){
    this.inputFile.nativeElement.click();
  };

  onFileSelected(event:any){
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => { this.imageSrc = e.target.result; };
    reader.readAsDataURL(file);
  };


  submit(){
    if(this.form.invalid) return;

    const body = this.form.value;
    this._auth.updateUser(body).subscribe(response => {
      Swal.fire({
        title: "Detalle del Usuario",
        text: "Usuario Actualizado correctamente",
        icon: "success"
      })
    })
  }
}
