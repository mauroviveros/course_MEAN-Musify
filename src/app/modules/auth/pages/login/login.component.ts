import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  public rememberControl: FormControl = new FormControl(false);

  public form: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });


  constructor(
    private _formBuilder: FormBuilder
  ){}


  public validate(controlName: string){
    const formControl = this.form.get(controlName);
    const isValid = formControl?.valid;
    if(formControl?.dirty || formControl?.touched) return isValid ? "is-valid" : "is-invalid";
    return;
  };

  public submit(){
    if(this.form.invalid) return Object.values(this.form.controls).forEach(control => control.markAsDirty());

    console.log(this.form.value);
    console.log(this.rememberControl.value);
  }

};
