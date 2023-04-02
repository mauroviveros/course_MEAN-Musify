import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
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
    private _formBuilder: FormBuilder
  ){};

  public validate(controlName: string){
    const formControl = this.form.get(controlName);
    const isValid = formControl?.valid;
    if((formControl?.dirty || formControl?.touched)) return isValid ? "is-valid" : "is-invalid";
    return;
  };

  public submit(){
    if(this.form.invalid) return Object.values(this.form.controls).forEach(control => control.markAsDirty());


    console.log(this.form.value);
  }
};
