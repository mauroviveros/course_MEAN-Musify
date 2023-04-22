import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song.routing';
import { CreateComponent } from './pages/create/create.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './pages/update/update.component';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    CreateComponent,
    FormComponent,
    UpdateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SongRoutingModule
  ],
  exports: [
    ListComponent
  ]
})
export class SongModule { }
