import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../auth.service";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  public showControl: FormControl = new FormControl(false);

  public form: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });


  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _auth: AuthService
  ){}


  public validate(controlName: string){
    const formControl = this.form.get(controlName);
    const isValid = formControl?.valid;
    if(formControl?.dirty || formControl?.touched) return isValid ? "is-valid" : "is-invalid";
    return;
  };

  public submit(){
    if(this.form.invalid) return Object.values(this.form.controls).forEach(control => control.markAsDirty());

    const { email, password } = this.form.value;
    this._auth.login(email, password, true).subscribe(response => {
      if(typeof response !== "boolean") return Swal.fire("Error", response, "error");
      return this._router.navigate([""]);
    });
  };

};
