import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album.routing';

import { FormComponent } from './components/form/form.component';
import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreateComponent,
    FormComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlbumRoutingModule,
    SharedModule
  ]
})
export class AlbumModule { }
