import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song.routing';
import { CreateComponent } from './pages/create/create.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './pages/update/update.component';


@NgModule({
  declarations: [
    CreateComponent,
    FormComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SongRoutingModule
  ]
})
export class SongModule { }
