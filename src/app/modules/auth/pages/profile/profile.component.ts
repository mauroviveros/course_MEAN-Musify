import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @ViewChild("inputFile") inputFile: ElementRef = {} as ElementRef;

  public get imgProfileURL (){
    return this._auth.imgProfileURL();
  }

  public form: FormGroup = this._formBuilder.group({
    name: [null],
    surname: [null],
    email: [null]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService
  ){}

  ngAfterViewInit(){
    const user = this._auth.user;
    this.form.get("name")?.setValue(user.name);
    this.form.get("surname")?.setValue(user.surname);
    this.form.get("email")?.setValue(user.email);

  }


  test(){
    this.inputFile.nativeElement.click();
  }
}
