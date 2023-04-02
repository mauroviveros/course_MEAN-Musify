import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

import { AuthService } from "../../auth.service";

@Component({
  selector: "auth-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  public form: FormGroup = this._formBuilder.group({
    name:     [null, [Validators.required]],
    surname:  [null, [Validators.required]],
    email:    [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _auth: AuthService
  ){};

  public validate(controlName: string){
    const formControl = this.form.get(controlName);
    const isValid = formControl?.valid;
    if((formControl?.dirty || formControl?.touched)) return isValid ? "is-valid" : "is-invalid";
    return;
  };

  public submit(){
    if(this.form.invalid) return Object.values(this.form.controls).forEach(control => control.markAsDirty());

    const body = this.form.value;
    this._auth.register(body).subscribe(response => {
      if(typeof response !== "boolean") return Swal.fire("Error", response, "error");
      return this._router.navigate([""]);
    });
  };
};
