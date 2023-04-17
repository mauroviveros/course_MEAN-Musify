import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album.routing';

import { CreateComponent } from './pages/create/create.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    CreateComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlbumRoutingModule
  ]
})
export class AlbumModule { }
