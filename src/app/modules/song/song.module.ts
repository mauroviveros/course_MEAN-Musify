import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song.routing';
import { CreateComponent } from './pages/create/create.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SongRoutingModule
  ]
})
export class SongModule { }
