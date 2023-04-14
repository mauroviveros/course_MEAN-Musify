import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ){}

  public submit(){
    if(this.form.invalid) return;

    console.log(this.form.value);
  }
}
