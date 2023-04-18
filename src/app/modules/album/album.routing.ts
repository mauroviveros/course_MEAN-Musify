import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  // { path: "", component: ListComponent },
  { path: "create", component: CreateComponent },
  { path: ":_id", component: DetailComponent },
  { path: ":_id/update", component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
