import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  exports: [MaterialModule]
})
export class SharedModule { }
